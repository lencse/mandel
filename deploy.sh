#/usr/bin/env bash

echo $NODE_ENV

openssl aes-256-cbc -K $encrypted_252ecb894c65_key -iv $encrypted_252ecb894c65_iv -in id_rsa_mandel.enc -out id_rsa_mandel -d

