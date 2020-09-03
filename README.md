# @alexlafroscia/ember-context

Consume values from elsewhere in your Ember application, without directly passing them

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install @alexlafroscia/ember-context
```

## Usage

Ember Services are excellent for sharing global state across your application. However, there are many times where some state needs to be shared _without_ it being considered global; it should be shared within a sub-tree of your application but thrown away once that sub-tree is no longer rendered.

To fill this gap, enter `ember-context`!

This addon is based on two related roles for a given value; a "Provider" and a "Consumer".

This "Provider" is always an instance of the `ContextProvider` component, which can be used like so:

```handlebars
<ContextProvider @key="shared-key" @value={{valueForSharedKey}}>
  {{! Consumer somewhere in here }}
</ContextProvider>
```

A "Consumer" can be either a usage of the `consume-context` helper _or_ a component that injects the value as a property.

### `consume-context`

The most basic -- and recommended -- usage is to consume a value using the `consume-context` helper. Using it might look like this:

```handlebars
{{consume-context "shared-key"}}
```

If placed beneath the `ContextProvider` in the example above, the helper will return `valueForSharedKey`. The beauty of this addon is that the helper can be _anywhere_ in your template, as long as there is a `ContextProvider` with a key of `shared-key` somewhere above it, even across component boundaries.

### `inject` Decorator

Additionally, for an experience closer to that of working with Ember services, you can add the `inject` decorator to your own components to consume a contextual value.

```javascript
// app/components/my-component.js
import Component from '@glimmer/component';
import { inject as context } from '@alexlafroscia/ember-context';

export default class MyComponent extends Component {
  @context('shared-key') sharedKeyValue;
}
```

Similar to the `consume-context` helper, if `MyComponent` is rendered somewhere within `ContextProvider` with a `@key` of `shared-key`, the value of the `sharedKeyValue` on `MyComponent` will be `valueForSharedKey`. This allows you to avoid using the helper if it is not appropriate for your use-case.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## Prior Art

- [`ember-provider`](https://github.com/alexlafroscia/ember-provider): My first attempt at scoping state to a sub-tree of an application. It relied on actually walking up the component tree which, while more reliable, it not really possible with public Ember APIs. `ember-context` does not use any private APIs.
- [React Context](https://reactjs.org/docs/context.html): The original inspiration for the ability to set a value in one place in the tree and receive it elsewhere.

## License

This project is licensed under the [MIT License](LICENSE.md).
