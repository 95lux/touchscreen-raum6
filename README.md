# Touchscreen Interface

Jonas proudly presents a beautiful Touchscreen Interface

## Install

```
npm install
npm install -g parcel-bundler
```

## Start Server

```
npm start
```

## Develop


### Build JS for Client

bundle once app.js from /src/index.js

```
parcel build src/index.js --out-dir public/ --out-file app.js --public-url ./public/
```

### Watch JS for Client

bundle new app.js from changes within /src/index.js

```
parcel watch src/index.js --out-dir public/ --out-file app.js --public-url ./public/
```

## Configuration

change ports and hosts inside `config.js`
