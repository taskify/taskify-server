module.exports = handler

var debug = require('../debug').insert
var wc = require('webcredits')
var fs = require('fs')

function handler(req, res) {

  var origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  var defaultCurrency = res.locals.config.currency || 'https://w3id.org/cc#bit';

  var source      = req.body.source;
  var destination = req.body.destination;
  var currency    = req.body.currency || defaultCurrency;
  var amount      = req.body.amount;
  var timestamp   = null;
  var description = req.body.description;
  var context     = req.body.context;


  var source      = req.session.userId

  if (!source) {
    res.send('must be authenticated')
    return
  }

  var faucetURI = 'https://w3id.org/cc#faucet'

  var config = require('../../config/dbconfig.js');

  var sequelize = wc.setupDB(config);
  wc.today(source, sequelize, config, function(err, ret){
    if (err) {
      console.error(err);
    } else {
      console.log(ret);
      if (ret === null) {
        ret = 0
      }

      var payout = 30
      var dailymax = 12000

      res.header('Content-Type', 'text/html')
      res.status(200)
      res.write('Credits today : ' + ret.toString());
      res.write('<br>\n')
      res.write('Daily max : ' + dailymax);
      res.write('<br>\n')


      var credit = {};

      credit["https://w3id.org/cc#source"] = faucetURI
      credit["https://w3id.org/cc#amount"] = payout
      credit["https://w3id.org/cc#currency"] = 'https://w3id.org/cc#bit'
      credit["https://w3id.org/cc#destination"] = req.session.userId

      if (description) {
        credit["https://w3id.org/cc#description"] = description
      }


      if (ret < dailymax) {
        wc.insert(credit, res.locals.sequelize, res.locals.config, function(err, ret) {
          if (err) {
            res.write(err);
          } else {
            res.write('<br>\n')
            res.write(payout + ' has been added to your <a href="/balance">balance</a>')
            res.write('<br>\n')
          }
          res.write('<br>\n')

          res.end()

        });

      } else {

        res.write('max has already been added to your <a href="/balance">balance</a> please come back tomorrow')
        res.write('<br>\n')

        res.end()

      }


    }
    sequelize.close();
  });


}
