# Create Static Site

This is a simple script mostly copied from [Harriet ryder's article](https://medium.com/northcoders/creating-a-project-generator-with-node-29e13b3cd309) that uses [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) and the [fs](https://nodejs.org/api/fs.html) module to generate a [Hugo](https://gohugo.io/) or [Jekyll](https://jekyllrb.com/) template onto the current directory.

The templates are based on frequent projects I build using both static-site generators. Templates include:
- Gulpfile with critical CSS and image optimization tasks.
- Critical font loading scripts based on [Zach Leatherman's recipie](https://www.zachleat.com/web/the-compromise/).
- Image lazy loading using [Lazyload.js](https://github.com/verlok/lazyload)
- Offline service worker support loosely based on  [Ethan Marcotte's](https://ethanmarcotte.com/theworkerofservices.js),
[Jeremy Keith's](https://adactio.com/serviceworker.js),
and [Filament Group's](https://www.filamentgroup.com/sw.js) recipes.
- Netlify config.

## Usage
- On repo's root, run `npm install -g`.
- On project's root, run `create`.
- Choose between **hugo** or **jekyll**.
- Files will be copied to root.

This is very much for personal use. But feel free to modify and improve upon.