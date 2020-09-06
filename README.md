# Verge AI Site

## Local Setup

1) Get the dev env: `amplify pull env dev`

1) Install dependencies: `npm install`

1) Start the server: `npm start`

## Updating local env

Amplify uses a cloud-based env system. In order to update your environment: `amplify pull dev`

## Publish changes

Will update the website's remote resources.

```
amplify publish
```

## Updating dependencies

Minor dependency upgrades are scripted: `./scripts/update_dependencies.sh`. Instructions are included for how to execute major version upgrades in the document.

## Amplify Setup

Whenever we want to setup AWS Amplify in a new account, there is mandatory one-time configuration that must be applied.

1) `amplify configure`

1) Configure custom domain hosting: https://docs.aws.amazon.com/amplify/latest/userguide/to-add-a-custom-domain-managed-by-amazon-route-53.html (cannot be accomplished via the CLI)

1) `amplify add auth`
