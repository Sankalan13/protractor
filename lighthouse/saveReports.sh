#!/bin/bash

#you need to have mongodb running in your system before you run this, the entire process will be scripted soon :) 
mongoimport -d reports -c reports --type csv --file /Users/sankalanparajuli/repos/protractor-test/report.csv --headerline