// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/fonts/XiaolaiSC-Regular/result.css" />
          {assets}
        </head>
        <body class="dark bg-body" data-hue="0">
          <div id="app" class="c-text bg-second">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
))
