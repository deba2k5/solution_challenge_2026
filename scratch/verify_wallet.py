from algosdk import account, mnemonic
import os

passphrase = "grid cry axis under sense little phrase grit crunch scrap later jaguar river middle fee action neglect odor state year scene damage shove absorb educate"
try:
    pk = mnemonic.to_private_key(passphrase)
    addr = account.address_from_private_key(pk)
    print(f"Address: {addr}")
except Exception as e:
    print(f"Error: {e}")
