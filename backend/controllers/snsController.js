const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const User = require('../models/User');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless'); // ヘッドレスモードで実行

const snsLogin = async (sns, username, password) => {
    let driver;
    try {
        driver = new Builder().forBrowser('chrome').build();

        switch (sns) {
            case 'instagram':
                await driver.get('https://www.instagram.com/accounts/login/');
                await driver.findElement(By.name('username')).sendKeys(username);
                await driver.findElement(By.name('password')).sendKeys(password);
                await driver.findElement(By.css('button[type="submit"]')).click();
                await driver.wait(until.elementLocated(By.css('nav')), 10000); // Instagramのホーム画面の一部を確認
                break;
            case 'youtube':
                await driver.get('https://accounts.google.com/ServiceLogin');
                await driver.findElement(By.id('identifierId')).sendKeys(username);
                await driver.findElement(By.id('identifierNext')).click();
                await driver.wait(until.elementLocated(By.name('password')), 10000);
                await driver.findElement(By.name('password')).sendKeys(password);
                await driver.findElement(By.id('passwordNext')).click();
                await driver.wait(until.elementLocated(By.css('a[title="YouTube"]')), 10000); // YouTubeの一部を確認
                break;
            case 'tiktok':
                await driver.get('https://www.tiktok.com/login');
                await driver.findElement(By.name('username')).sendKeys(username);
                await driver.findElement(By.name('password')).sendKeys(password);
                await driver.findElement(By.css('button[type="submit"]')).click();
                await driver.wait(until.elementLocated(By.css('header')), 10000); // TikTokのホーム画面の一部を確認
                break;
            default:
                throw new Error('Unsupported SNS');
        }

        return true;
    } catch (err) {
        console.error('SNS Login Error:', err);
        return false;
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
};

const registerSNS = async (req, res) => {
    const { sns, username, password } = req.body;
    try {
        const loginSuccess = await snsLogin(sns, username, password);

        if (!loginSuccess) {
            return res.status(400).send({ error: 'SNS login failed' });
        }

        const user = await User.findById(req.userId);
        user.snsAccounts = user.snsAccounts || [];
        user.snsAccounts.push({ sns, username, password });
        await user.save();

        res.status(201).send({ message: 'SNS account registered successfully' });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).send({ error: 'Server error' });
    }
};
const getSNSAccounts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.status(200).send({ accounts: user.snsAccounts });
    } catch (err) {
        console.error('Fetch Accounts Error:', err);
        res.status(500).send({ error: 'Server error' });
    }
};

const deleteSNSAccount = async (req, res) => {
    const { sns } = req.params;
    try {
        const user = await User.findById(req.userId);
        user.snsAccounts = user.snsAccounts.filter(account => account.sns !== sns);
        await user.save();
        res.status(200).send({ message: 'SNS account deleted successfully' });
    } catch (err) {
        console.error('Delete Account Error:', err);
        res.status(500).send({ error: 'Server error' });
    }
};

module.exports = { registerSNS, getSNSAccounts, deleteSNSAccount };

