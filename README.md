# odoo-xmlrpc

Node.js client library for [odoo](https://www.odoo.com/) ERP using xmlrpc.

## Node version
Works better with NodeJS v11.16 and further

## Installation

```sh
$ npm install async-odoo-xmlrpc
```

## Methods

```js
odoo.connect(): Promise<void>
odoo.execute_kw(model, method, params): Promise<Object>
odoo.exec_workflow(model, method, params): Promise<Object>
odoo.render_report(report, params): Promise<Object>
```

## Usage

```js
var Odoo = require('async-odoo-xmlrpc');
```

### Configuration

```js
var odoo = new Odoo({
    url: <insert server URL>,
    port: <insert server Port (by default 80)>,
    db: <insert database name>,
    username: '<insert username>',
    password: '<insert password>'
});
```

### Logging in

```js
async(() => {
    try {
        await odoo.connect();
        console.log("Connect to Odoo XML-RPC is successed.");
    } catch(e) {
        console.error("Error when try connect Odoo XML-RPC.", e);
    }
})();
```

### Calling methods

```js
async(() => {
    await odoo.connect();
    let params = ['read', false];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'check_access_rights'	// method name
            , [params]
        );
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### List Records

```js
async(() => {
    await odoo.connect();
    let params = [
        [['is_company', '=', true],['customer', '=', true]]
    ];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'search'	// method name
            , [params]
        );
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Pagination

```js
async(() => {
    await odoo.connect();
    let params = [
		[['is_company', '=', true],['customer', '=', true]]
        , 10	// offset
        , 5		// limit
    ];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'search'	// method name
            , [params]
        );
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Count records

```js
async(() => {
    await odoo.connect();
    let params = [
		[['is_company', '=', true],['customer', '=', true]]
    ];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'search_count'	// method name
            , [params]
        );
        console.log("Count: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Read records

```js
async(() => {
    await odoo.connect();
    let params = [
		[['is_company', '=', true],['customer', '=', true]]
        , 0	// offset
        , 1	// limit
    ];
    try {
    	let ids = await odoo.execute_kw(
            'res.partner'	// model name
            , 'search'	// method name
            , [params]
        );
        let result = await odoo.execute_kw('res.partner', 'read', [ids]);
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Read records filtered by fields

```js
async(() => {
    await odoo.connect();
    let params = [
		[['is_company', '=', true],['customer', '=', true]]
        , 0	// offset
        , 1	// limit
    ];
    try {
    	let fields = await odoo.execute_kw(
            'res.partner'	// model name
            , 'search'	// method name
            , [params]
        );
        fields.push(['name', 'country_id', 'comment']);
        let result = await odoo.execute_kw('res.partner', 'read', [ids]);
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Listing record fields

```js
async(() => {
    await odoo.connect();
    let params = [
		[], [], []
        , ['string', 'help', 'type']
    ];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'fields_get'	// method name
            , [params]
        );
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Search and read

```js
async(() => {
    await odoo.connect();
    let params = [
		[['is_company', '=', true],['customer', '=', true]]
        , ['name', 'country_id', 'comment']
        , 0	// offset
        , 5 // limit
    ];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'search_read'	// method name
            , [params]
        );
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Create records

```js
async(() => {
    await odoo.connect();
    let params = [
		{'name': 'FFNew Partner'}
    ];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'create'	// method name
            , [params]
        );
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Update records

```js
async(() => {
    await odoo.connect();
    let params = [
        [3626]
		, {'name': 'FFNew Partner'}
    ];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'write'	// method name
            , [params]
        );
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Delete records

```js
async(() => {
    await odoo.connect();
    let params = [
        [3626]
    ];
    try {
    	let result = await odoo.execute_kw(
            'res.partner'	// model name
            , 'unlink'	// method name
            , [params]
        );
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Inspection and introspection (ir.model)

```js
async(() => {
    await odoo.connect();
    let params = [
        {'name': 'Custom Model', 'model': 'x_custom_model', 'state': 'manual'}
    ];
    try {
    	let fields = await odoo.execute_kw(
            'ir.model'	// model name
            , 'create'	// method name
            , [{'name': 'Custom Model', 'model': 'x_custom_model', 'state': 'manual'}]
        );
	    let result = await odoo.execute_kw('x_custom_model', 'fields_get', [
            [], [], [], ['string', 'help', 'type']
        ]);
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Inspection and introspection (ir.model.fields)

```js
async(() => {
    await odoo.connect();
    try {
        await odoo.execute_kw('ir.model', 'create', [{
            'name': 'Custom Model'
            , 'model': 'x_custom_model'
            , 'state': 'manual'
        }]);
        
        let model_id = await odoo.execute_kw('ir.model.fields', 'create', [{
                'model_id': model_id
                , 'name': 'x_name'
                , 'ttype': 'char'
                , 'state': 'manual'
                , 'required': true
        }]);
        
        let fields = await odoo.execute_kw('x_custom', 'create', [{
            'x_name': 'test record'
        }]);
        let result = await odoo.execute_kw('x_custom', 'read', [[fields]]);
        console.log("Result: ", result);
    } catch(e) {
        console.error("Error when try call execute_kw.", e);
    }
})();
```

### Workflow manipulations

```js
(async() => {
    await odoo.connect();
    let user = await odoo.execute_kw('res.partner', 'search_read', [
        [['customer', '=', true]]
        , ['property_account_receivable', 'property_payment_term', 'property_account_position']
        , 0, 1
    ]);
    let invoice = await odoo.execute_kw('account.invoice', 'create', [{
        'partner_id': user[0]['id'],
        'account_id': user[0]['property_account_receivable'][0],
        'invoice_line': [0, False, {'name': "AAA"}]
    }]);

    /**
     * Call workflow
     */
    let result = await odoo.execute_kw('account.invoice', 'invoice_open', [invoice]);
    console.log("Result: ", result);

})();
```

### Report printing

```js
(async() => {
    await odoo.connect();
    let rs = await odoo.execute_kw('account.invoice', 'search', [
        [['type', '=', 'out_invoice'], ['state', '=', 'open']]
    ]);
    let result = await odoo.render_report('account.report_invoice', [rs]);
    console.log("Result: ", result);
})();
```

## Reference

* [Odoo Technical Documentation](https://www.odoo.com/documentation/8.0)
* [Odoo Web Service API](https://www.odoo.com/documentation/8.0/api_integration.html)

## License

Copyright 2016 Qazi Faisla Sami

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
