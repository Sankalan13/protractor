import {protractor, browser, $$, $} from 'protractor'

describe('angular-material input component page', function() {
    const EC = protractor.ExpectedConditions;
  
    it('Should change input component value', async() => {
      await browser.get('https://material.angular.io/components/input/examples');
        
      await browser.wait(EC.visibilityOf($('.docs-example-viewer-wrapper')), 3000);
        
      const emailInputField = $$('.mat-form-field-infix>input').get(1);
        
      await emailInputField.sendKeys('invalid');
        
      expect($('mat-error').isPresent()).toBeTruthy();
    });
  });