# VegaIT Front-end HBS Starter v2.0.0

## v2.0.2 Changes
- Added node version script - you will not be able to install modules if not on the correct version, specified in the package.json
- All packages are updated (30.07.2020.)
- **gulp**
	- Build will not break if you have an empty folder in html folder
	- Added .html files on watch for hbs compile
	- Added js as an initial task when runing watch
- **SCSS**
	- Added `width: 100%` when generating a new .scss file so lint won't report a warning (new fix from the last version)
	- Replaced `.js-animation` class with `.loaded` for animation mixin
	- Removed `base-float` mixin
- **Javascript**
	- Some of the rules that were errors before are not warnings
	- Added new lint rules
		- keyword-spacing
		- no-multiple-empty-lines
	- Removed slick from _libs folder and added it as a dependency
	- Exposed jQuery and $ for developer tools

## v2.0.1 Changes
- updated Node.js to version 12.18.0
- all packages are updated (13.06.2020.)
- **Handlebars**
	- Previous .html files needed for importing content now requires .content.html extension, so you would call it for example text.content.html
	- Removed trailing html tags
	- Added comment to the block when generating a new .scss file so lint won't report a warning
	- When not using the correct version of node.js you will receive an error message
	- Increase JS build time while in development mode by adding a dynamic webpack mode
	- removed "productionBuild" and "stageBuild" keys in global variables in favor of "mode" key which can be "development", "stage" or "production"

## v2.0.0 Changes
- updated Node.js to version 12.13.0
- all packages are updated
- **Handlebars**
	- implementation of handlebars is changed
	- added multilanguage support
	- you can add a custom class to body tag of each page individually
	- if you need to write some content you can create a custom .html file and try your HTML there and then import it in the .json file
- **gulp** watch will not fail if you: *(as a fallback you will get a message telling you whats wrong)*
	- make your .json file invalid
	- make your .hbs file invalid
	- rename/delete or just move some of the current .json/.html partial files
- **SCSS**
	- added cache buster for icon font, which mean every build will create a new _icon-font.scss file with new timestamps
	- added new lint rule: leading-zero: 1
	- added new mixins, font, aspect-ration, animation and icon
- **JavaScript**
	- jQuery updated to 3.4.1
	- Babel is more functional now, it should apply polyfills for more things (keep in mind that polyfills can drastically increase file size)

For more detailed information, please continue reading.

## Installation Instructions

Install dependencies by running Node.js package manager.

		npm install

Launch *development build* Gulp task.

		gulp build-dev


## Gulp Tasks

### Starting Dev Mode

To start *watch mode*, execute `gulp` task.

		gulp


### Creating a Module

To create a new module, execute `gulp cf` task and pass `-m` with argument.

		gulp cf -m some-module

This command will create new module files in `src/html/modules` directory:
* .hbs
* .json

And also a file in `src/scss/modules` directory:
* .scss

It will also update `style.scss` file in `src/scss` directory.

If you use `isMultilanguage` global variable, you will need to run `gulp add-lng` to generate missing languange files

### Creating a Template

To create a new template, execute `gulp cf` task and pass `-t` with argument.

		gulp cf -t some-template

This command will create new template files in `src/html/templates` directory:
* .hbs
* .json

If you use `isMultilanguage` global variable, you will need to run `gulp add-lng` to generate missing languange files

### Generate Font Icons

To generate font icons, execute `gulp iconfont` task.

		gulp iconfont

This command will generate fonts:
* .ttf
* .woff
* .woff2

in `dist/assets/fonts` directory based on svg files from `src/assets/svg` directory.

It will also update `_icon-font.scss` file in `src/scss/layout` directory.

See that file for css classes you can use to display font icons.

In order to show icons, all you need to do is add class `"icon font-ico-heart"`

		<span class="icon font-ico-heart"></span>


### Building Files

To clean up dist folder (remove it), execute `gulp reset-dev`. This is helpful when many images are updated or removed, until dist is cleaned up, build task will not remove these images.

		gulp reset-dev

To create development version files, execute `gulp build-dev` task (noindex, nofollow + NOT minified css and js).

		gulp build-dev

To create stage version files, execute `gulp build-stage` task (noindex, nofollow + minified css and js).

		gulp build-stage

To create production version files, execute `gulp build-prod` task (index, follow, GTM + minified css and js).

		gulp build-prod

## Using Files

### HBS
#### Modules
All sections, modules, blocks, ... *(header, footer, banner...)* should be created as modules in `src/html/modules` and `src/scss/modules` directory.

Each module has three files:

* `src/html/modules` directory:
		* .hbs *(module html templating structure)*
		* .json *(module content)*

* `src/scss/modules` directory:
		* .scss *(module styles)*

**Example:**

*.hbs file:*
```
<div class="team-list">
	<h2>{{title}}</h2>

	{{#if people}}
		<ul>
			{{#each people}}
				<li>{{this.name}} {{this.surname}}</li>
			{{/each}}
		</ul>
	{{/if}}
</div>
```

*.json file:*
```
{
	"title": "Team List",
	"people": [
		{
			"name": "Emiko",
			"surname": "Groce"
		},
		{
			"name": "Leonila",
			"surname": "Gillins"
		}
	]
}
```

*This will compile into:*
```
<div class="team-list">
	<h2>Team List</h2>

	<ul>
		<li>Emiko Groce</li>
		<li>Leonila Gillins</li>
	</ul>
</div>
```

See [Handlebars](https://handlebarsjs.com/) templating engine for more information about `.hbs` files.

#### Templates

Ideally all Templates should be created using *Modules*.

Each template has two files:
* .hbs *(template html templating structure)*
* .json *(template content)*

**Example:**

*.hbs file:*
```
{{#> master data }}
	{{#*inline "template-content"}}

		{{> header header}}

		{{> basic-block basicBlock}}

		{{> basic-block basicBlock2}}

		{{> basic-block basicBlock3}}

		{{> footer footer}}

	{{/inline}}
{{/master}}
```
*All page content **MUST** be inside `{{#HTML data}}{{/HTML}}` tag with `data` parameter*.

*.json file:*
```
{
	"template": "about",
	"data": {
		"header": {
			">>": "header/data.json"
		},
		"footer": {
			">>": "footer/data.json"
		},
		"basicBlock": {
			">>": "basic-block/data.json"
		},
		"basicBlock2": {
			"title": "This diferent Title",
			"content": "modules/basic-block/text.content.html"
		},
		"basicBlock3": {
			">>": "basic-block/data.json",
			"title": "This is changed Title"
		}
	}
}
```

- Use `template` prop to set the name of compiled file *(`"template": "about"` will create `about.html`)*

- Use `class` prop to set the body class for certain template *(`"class": "about"` will add a `about` class to that template)*

- Use `data` prop object to:
- **include** module's `data.json` file:
```
"header": {
		">>": "header/data.json"
}
```
- **include** module's .html file:
```
"basicBlock2": {
		"content": "modules/basic-block/text.content.html"
},
```
- or **input** different data:
```
"basicBlock2": {
		"title": "This diferent Title",
}
```
- or **include** modules's `data.json` file and override **only** data you need:
```
"basicBlock3": {
		">>": "basic-block/data.json",
		"title": "This is changed Title"
}
```

*This will compile into an `.html` file in `dist` directory.

#### CONDITIONS

The `compare` helper can be used where truthy or falsy data values are not enough, but you instead like to compare two data values, or compare something against a static value.

It supports all common operators, like `===`, `!==`, `<`, `<=`, `>`, `>=`, `&&` and `||`.

**Example:**

```
{{#if (compare v1 'operator' v2) }}
	foo
{{else if (compare v1 'operator' v2) }}
	bar
{{else}}
	baz
{{/if}}
```

Inline (nested) Condition Usage:

```
{{#if (compare (compare v1 'operator' v2) 'operator' (compare v1 'operator' v2))}}
	foo
{{else}}
	bar
{{/if}}
```


### SCSS
All styles should be written in `src/scss` directories.

CSS code quality is checked with [Sass Lint](https://github.com/sasstools/sass-lint)

### JavaScript
All scripts should be written in `src/js` directories.

Javascript code quality is checked with [ESLint](https://eslint.org/)



## Config files

### Global Variables
In this file are some variables that are used for or control the behavior of gulp tasks.
Path: src/config/gulp-tasks/_global-vars.js

### isBeta
By default its value is set to `false` and it should be unchanged unless you are working on Emperor projects.
Changing its value to `true` and re-running build task will create a button in the upper right corner, by clicking the button a popup will be opened. Running `gulp build-prod` will automatically change its value to `false` and the button as well as the popup will not be rendered.
This should tell the client that the project is still in working phase and changes may occur.

### isMultilanguage
If you select this option hbs will get generated into separate folder for all of the languages.
**Important!** use this only if its a static website or an annual report.
To add more languages just updated the `globalVars.languages` array with new language.
