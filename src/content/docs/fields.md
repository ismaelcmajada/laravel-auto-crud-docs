---
title: Field Definitions
description: Complete guide to defining fields in the AutoCrud trait
---

# Field Definitions

The `getFields()` method is the core of the AutoCrud trait. It defines the metadata for each model attribute, controlling how fields appear in forms, tables, and API responses.

## Basic Structure

```php
protected static function getFields(): array
{
    return [
        [
            'name' => 'Field Label',
            'field' => 'column_name',
            'type' => 'field_type',
            'table' => true,
            'form' => true,
            'rules' => ['required' => true],
        ],
        // More fields...
    ];
}
```

## Common Field Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Human-readable label for the field |
| `field` | string | Yes | Database column/attribute name |
| `type` | string | Yes | Field type (controls rendering and casting) |
| `table` | bool | No | Whether field appears in data tables |
| `form` | bool | No | Whether field appears in forms |
| `rules` | array | No | Validation rules |
| `default` | mixed | No | Default value |
| `onlyUpdate` | bool | No | Only visible/usable during updates |
| `hidden` | bool | No | Hide in forms (useful for `comboField`) |
| `options` | array | No | Options for select fields |
| `endPoint` | string | No | API endpoint for combobox fields |
| `itemTitle` | string | No | Field displayed in combobox |
| `comboField` | string | No | Auxiliary field added as hidden to form |

## Field Types

### Basic Types

```php
// String field
[
    'name' => 'Name',
    'field' => 'name',
    'type' => 'string',
    'table' => true,
    'form' => true,
]

// Number field
[
    'name' => 'Price',
    'field' => 'price',
    'type' => 'number',
    'table' => true,
    'form' => true,
]

// Boolean field
[
    'name' => 'Active',
    'field' => 'is_active',
    'type' => 'boolean',
    'table' => true,
    'form' => true,
]

// Password field
[
    'name' => 'Password',
    'field' => 'password',
    'type' => 'password',
    'form' => true,
    'rules' => ['required' => true],
]
```

### Date and Time Fields

```php
// Date field
[
    'name' => 'Birth Date',
    'field' => 'birth_date',
    'type' => 'date',
    'table' => true,
    'form' => true,
]

// DateTime field
[
    'name' => 'Created At',
    'field' => 'created_at',
    'type' => 'datetime',
    'table' => true,
]
```

### Selection Fields

```php
// Select field with options
[
    'name' => 'Status',
    'field' => 'status',
    'type' => 'select',
    'options' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
        'pending' => 'Pending',
    ],
    'table' => true,
    'form' => true,
]

// Combobox field
[
    'name' => 'Category',
    'field' => 'category_id',
    'type' => 'combobox',
    'endPoint' => '/api/categories',
    'itemTitle' => 'name',
    'table' => true,
    'form' => true,
]
```

### Text Fields

```php
// Text area
[
    'name' => 'Description',
    'field' => 'description',
    'type' => 'text',
    'form' => true,
]

// Telephone field
[
    'name' => 'Phone',
    'field' => 'phone',
    'type' => 'telephone',
    'table' => true,
    'form' => true,
]

// Decimal field
[
    'name' => 'Amount',
    'field' => 'amount',
    'type' => 'decimal',
    'table' => true,
    'form' => true,
]
```

## Validation Rules

```php
[
    'name' => 'Email',
    'field' => 'email',
    'type' => 'string',
    'rules' => [
        'required' => true,
        'unique' => true,
        'custom' => ['email_validation'], // References getCustomRules()
    ],
    'table' => true,
    'form' => true,
]
```

## Automatic Casting

The `initializeAutoCrud()` method automatically applies casting based on field types:

- `number` with relation → `integer`
- `number` without relation → `string`
- `boolean` → `boolean`
- `password` → `hashed` (also added to `$hidden`)
- `date` → `DateWithUserTimezone::class . ':d-m-Y'`
- `datetime` → `DateTimeWithUserTimezone::class . ':d-m-Y H:i'`
- `telephone` → `string`

## Best Practices

1. **Always define required properties**: `name`, `field`, and `type` are mandatory
2. **Use descriptive names**: Make field labels user-friendly
3. **Set appropriate defaults**: Use `table` and `form` properties to control visibility
4. **Validate input**: Always add appropriate validation rules
5. **Consider relationships**: Use proper field types for foreign keys

## Example: Complete Product Model

```php
protected static function getFields(): array
{
    return [
        [
            'name' => 'Name',
            'field' => 'name',
            'type' => 'string',
            'table' => true,
            'form' => true,
            'rules' => ['required' => true, 'unique' => true],
        ],
        [
            'name' => 'Description',
            'field' => 'description',
            'type' => 'text',
            'form' => true,
        ],
        [
            'name' => 'Price',
            'field' => 'price',
            'type' => 'decimal',
            'table' => true,
            'form' => true,
            'rules' => ['required' => true],
        ],
        [
            'name' => 'Active',
            'field' => 'is_active',
            'type' => 'boolean',
            'table' => true,
            'form' => true,
            'default' => true,
        ],
        [
            'name' => 'Category',
            'field' => 'category_id',
            'type' => 'combobox',
            'endPoint' => '/api/categories',
            'itemTitle' => 'name',
            'table' => true,
            'form' => true,
            'rules' => ['required' => true],
        ],
    ];
}
```
