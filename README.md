## Introduction

Basic income in portions to to exceed a daily amount

## Components

The demo contains 3 components

* /balance -- shows your balance
* /faucet -- a small app that will see your balance
* /home -- navigation and instructions

Each was deployed as a custom route with its own handler.  

## Installation

Installation is via

    git clone https://github.com/quantumpayments/basic_incom.git

Then run

    npm install


```bash
$ bin/server.js  --port 8443 --ssl-key path/to/ssl-key.pem --ssl-cert path/to/ssl-cert.pem
# server running on https://localhost:8443/
```

##### How do I get the --ssl-key and the --ssl-cert?
You need an SSL certificate you get this from your domain provider or for free from [Let's Encrypt!](https://letsencrypt.org/getting-started/).

If you don't have one yet, or you just want to test `solid`, generate a certificate
```
$ openssl genrsa 2048 > ../localhost.key
$ openssl req -new -x509 -nodes -sha256 -days 3650 -key ../localhost.key -subj '/CN=*.localhost' > ../localhost.cert
```

## Faucet

Using [webcredits](https://webcredits.org/) it is possible to set up a faucet using

    credit create

    credit genesis

    credit insert https://w3id.org/cc#coinbase 50000 '' https://w3id.org/cc#faucet
