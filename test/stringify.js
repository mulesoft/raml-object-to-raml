var expect = require('chai').expect;
var toRaml = require('../');

describe('raml object to raml', function () {
  var RAML_PREFIX = '#%RAML 0.8';

  describe('base parameters', function () {
    it('title', function () {
      var str = toRaml({
        title: 'Example API'
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'title: Example API'
      ].join('\n'));
    });

    it('base uri', function () {
      var str = toRaml({
        baseUri: 'http://example.com'
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'baseUri: http://example.com'
      ].join('\n'));
    });

    it('media type', function () {
      var str = toRaml({
        mediaType: 'application/json'
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'mediaType: application/json'
      ].join('\n'));
    });

    it('version', function () {
      var str = toRaml({
        version: 'v1.0'
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'version: v1.0'
      ].join('\n'));
    });

    it('base uri parameters', function () {
      var str = toRaml({
        baseUriParameters: {
          domain: {
            type: 'string',
            default: 'api'
          }
        }
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'baseUriParameters:',
        '  domain:',
        '    type: string',
        '    default: api'
      ].join('\n'));
    });

    it('security schemes', function () {
      var str = toRaml({
        securitySchemes: [{
          oauth_2_0: {
            type: 'OAuth 2.0',
            settings: {
              authorizationUri: 'https://github.com/login/oauth/authorize',
              accessTokenUri: 'https://github.com/login/oauth/access_token',
              authorizationGrants: [
                'code'
              ],
              scopes: [
                'user',
                'user:email',
                'user:follow',
                'public_repo',
                'repo',
                'repo:status',
                'delete_repo',
                'notifications',
                'gist'
              ]
            }
          }
        }]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'securitySchemes:',
        '  - oauth_2_0:',
        '      type: OAuth 2.0',
        '      settings:',
        '        authorizationUri: https://github.com/login/oauth/authorize',
        '        accessTokenUri: https://github.com/login/oauth/access_token',
        '        authorizationGrants: [ code ]',
        '        scopes:',
        '          - user',
        '          - user:email',
        '          - user:follow',
        '          - public_repo',
        '          - repo',
        '          - repo:status',
        '          - delete_repo',
        '          - notifications',
        '          - gist'
      ].join('\n'));
    });

    it('schemas', function () {
      var str = toRaml({
        schemas: [
          {
            labels: '{\n    \"$schema\": \"http://json-schema.org/draft-03/schema\",\n    \"type\": \"array\",\n    \"list\": [\n      {\n        \"properties\": {\n          \"url\": {\n            \"type\": \"string\"\n          },\n          \"name\": {\n            \"type\": \"string\"\n          },\n          \"color\": {\n            \"type\": \"string\",\n            \"maxLength\": 6,\n            \"minLength\": 6\n          }\n        },\n        \"type\": \"object\"\n      }\n    ]\n}'
          },
          {
            labelsBody: '{\n  \"required\": true,\n  \"$schema\": \"http://json-schema.org/draft-03/schema\",\n  \"type\": \"array\",\n  \"items\": [\n    {\n      \"type\": \"string\"\n    }\n  ]\n}'
          }
        ]
      });

      expect(str).to.equal([
        RAML_PREFIX,
        'schemas:',
        '  - labels: |',
        '      {',
        '          "$schema": "http://json-schema.org/draft-03/schema",',
        '          "type": "array",',
        '          "list": [',
        '            {',
        '              "properties": {',
        '                "url": {',
        '                  "type": "string"',
        '                },',
        '                "name": {',
        '                  "type": "string"',
        '                },',
        '                "color": {',
        '                  "type": "string",',
        '                  "maxLength": 6,',
        '                  "minLength": 6',
        '                }',
        '              },',
        '              "type": "object"',
        '            }',
        '          ]',
        '      }',
        '  - labelsBody: |',
        '      {',
        '        "required": true,',
        '        "$schema": "http://json-schema.org/draft-03/schema",',
        '        "type": "array",',
        '        "items": [',
        '          {',
        '            "type": "string"',
        '          }',
        '        ]',
        '      }'
      ].join('\n'));
    });
  });
});