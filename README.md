# Plugin for dx-platform

### This plugin is used to group all the files from a project by their programming language.

## Prerequisites
* **dx-platform**
* **Node.js** version 14.x.x
* **openjdk** version 1.8.x

## Installation
The plugin can be cloned by running the command from the **dxworks** directory inside dx-platform.
```bash
cd .dx-platform & mkdir dxworks & cd dxworks
git clone https://github.com/alex-rotariu/language-component-definer.git
```

After getting the plugin you can add it to dx-platform by executing:
```bash
sh deploy.sh
```

## Docker installation
If you have Docker you can download the project image with dx-platform and 2 test projects installed. 
```bash
docker pull daidalos8/language-definer
docker run -p 6060:6060 daidalos8/language-definer
```

The application will open at <http://localhost:6060/index.html>


## Usage
After deploying the plugin to dx-platform, you can analyze a project with it. The plugin will create a JSON file that contains a list of objects. The objects will have two attributes, a string *fullyQualifiedName* representing the component name and *files*, representing a list of file paths specific to that programming language.


```JSON
{
        "fullyQualifiedName": "TypeScript",
        "files": [
            "superset-frontend/src/featureFlags.ts",
            "superset-frontend/spec/javascripts/utils/safeStringify_spec.ts",
            "superset-frontend/src/utils/safeStringify.ts",
            "superset-frontend/src/setup/setupPlugins.ts",
            "superset-frontend/src/SqlLab/utils/sqlKeywords.ts",
            ...
         ]
}
```

Dx-platform will use this output file in order to generate a system map based on the relationships between these components.

## Licence
[![MIT](https://img.shields.io/badge/Licence-MIT-green)](LICENSE)