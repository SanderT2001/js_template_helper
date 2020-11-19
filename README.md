# Simple Javascript Template Helper
- ES2015 Compatible

## Usage

### Load
```html
<html>
    <head>
        <script type="text/javascript" src="dist/template_parser.js"></script>
        <script type="text/javascript" src="dist/template_datakey.js"></script>
        <script type="text/javascript" src="dist/template.js"></script>
        <script type="text/javascript" src="dist/template_helper.js"></script>
    </head>
    <body>
    </body>
</html>
```

### Template Example
```html
<div style="display: none;">
    <template id="tpl">
        <div data-id="{{User.id}}" style="background-color: red; color: #ffffff;" class="container">
            <h4>[[ ("{{ User.title }}") ? "{{User.title}}" : 'Placeholder'; ]]</h4>
            <span>{{ User.name }}</span>
            <b>Project</b> {{ User.Project.name }}
        </div>
    </template>
</div>
```

### Container Example
```html
    <div class="container"></div>
```

### Data Example
```json
[{"User":{"id":10,"created":"2020-11-19","title":"","name":"Sander Tuinstra","Project":{"id":1,"name":"Project #1"}}},{"User":{"id":110,"created":"2020-11-18","title":"Geachte mevrouw","name":"Sander Tuinstra 2","Project":{"id":2,"name":"Project #2"}}}]
```

### Javascript Implementation Example
```js
    let template = new TemplateHelper('#tpl', '.container', {
        guid_data_attr: "id",
        sort : {
            field     : 'User.sort',
            direction : 'asc'
        }
    });
    const data = {}; // JSON.parse(json_string);
    template.render(data);
```
