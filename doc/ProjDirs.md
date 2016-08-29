# Structure

> @see https://github.com/systemjs/systemjs/blob/master/docs/module-formats.md

## AMD Module Style

```js
define(function (require) {

  function init() {
    var calculator = require('lib/dev/calculator');
    EL.log('Hello ' + calculator.name() + ' - Powered by SystemJS!');
  }

  return init;
});
```

## Project Structure

```
stp-web/
  src/
    main/

      # -- # WORKSPACE --

      static/      # img, css, js, html
        el/        # app
          el.*     # app common functions
          home.*   # home module

          lib/     # app common modules
          zz/      # `zz` is package name, `zz999` is module id.
            zz999.html
            zz999.css
            zz999.js

        theme/     # theme
        images/    # images

      # -- / WORKSPACE --

      views/       # node.js - mvc
        layouts/   # node.js - view layouts
        partials/  # node.js - view partials
        home.hbs   # node.js - home page

      services     # node.js - data provider
        MenuService.js
        PmService.js

      app.js       # node.js - app startup

    test/          # node.js - tests
```
