Statistics Panel - External Grafana Plugin - CONTRIBUTING

## Install

If you want simply to run the plugin you will only need step 1. and 4.

1. Clone or copy the repo to your grafana plugin folder.

2. Install lib dependencies with npm or yarn.
```
$ yarn install
```

3. Confirm that you have data to use
eg. Start kubectl to acquire data.
```sh
$ kubectl [--kubeconfig <path to config file>] port-forward --namespace prod crate-0 4200:4200
```

4. Start your docker container.
```sh
(...)/grafana/plugins/statistics_panel (master)$ docker-compose start grafana
```

## Development

1. Clone project

2. Go to the plugin location
```
$ cd grafana/plugins/statistics_panel
```

3. Make your changes

4. Build
```sh
$ yarn build
```

5. Start / Restart Grafana container

$ docker-compose restart grafana


## Other Info

If you get permissions error, probably your user should have the group expected by grafana to avoid using sudo.


