## Rules

#### commit-message-pattern

Checks commit message using provided regexp. It can be handy if want to restrict developers to use a specific commit format for whatever reason.

Options:
 - Level: `error` or `warn` or `ignore`.
 - Regexp in string format, e.g string `"^\\[(patch|minor|major)\\]\\s.{3,}"` represents `/^\[(patch|minor|major)\]\s.{3,}/` regexp.
 - Regexp options, `g`, `i` etc.

Example: 

```json
{
  "commit-message-pattern": ["error", "^\\[(patch|minor|major)\\]\\s.{3,}", "i"]
}
```


#### commit-min-len

Checks min length of a commit message.

Options:
 - Level: `error` or `warn` or `ignore`.
 - Min number of characters in a commit message.

Example: 

```json
{
  "commit-min-len": ["error", 10]
}
```

#### commit-max-len

Checks max length of a commit message.

Options:
 - Level: `error` or `warn` or `ignore`.
 - Max number of characters in a commit message.

Example: 

```json
{
  "commit-min-len": ["error", 256]
}
```
