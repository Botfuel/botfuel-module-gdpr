# GDPR module

The **GDPR** module provides:

- a dialog
- a generic view and 3 localized views (EN, FR, ES)

By including this module in your bot, you will get the ability to call a `gdpr` dialog that will ask for the consent to allow the bot to use any personal information the end user may provide during conversations.
The consents (yes/no, text of consent and date) are stored in the brain for each user.

You can specify multiple consents by extending the `GDPRDialog` and adding more entities. The messages can be customized by extending the `GDPRView`.

## Resources
* [GDPR module documentation](http://docs.botfuel.io/dialog/modules/gdpr)

## About modules

See the [Modules Overview](http://docs.botfuel.io/dialog/modules/overview).

## License

See the [**License**](LICENSE.md) file.
