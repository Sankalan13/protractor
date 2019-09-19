import {browser, element, by} from 'protractor';

export class AngularHomepage {
  nameInput = element(by.model('yourName'));
  greeting = element(by.binding('yourName'));

  async get(): Promise<void> {
    await browser.get('http://www.angularjs.org');
  }

  async setName(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  // getGreeting returns a native Promise<string>
  async getGreeting(): Promise<string> {
    return this.greeting.getText();
  }
}