Statistics Panel - External Grafana Plugin - CONTRIBUTING

## Install

1. Clone or copy the repo to your grafana plugin folder.

2. Confirm that you have data to use

eg. Start kubectl to acquire data.
```sh
$ kubectl [--kubeconfig <path to config file>] port-forward --namespace prod crate-0 4200:4200
```

3. If using docker, start your docker container.
```sh
(...)/grafana/plugins/statistics_panel (master)$ docker-compose start grafana
```

4. Config your plugin at grafana url

Probably at dev, http://localhost:3000.

## Development

1. Clone project

2. Go to the plugin location
```
$ cd grafana/plugins/statistics_panel
```

3. Install lib dependencies with npm or yarn.
```
$ yarn install
```

4. Make your changes

5. Build
```sh
$ yarn build
```

6. Start / Restart Grafana container

$ docker-compose restart grafana


## Other Info

If you get permissions error, probably your user should have the group expected by grafana to avoid using sudo.
