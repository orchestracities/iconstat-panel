# Statistics Panel - External Grafana Plugin

The Statistics Panel allows you to show the one main summary stat of a SINGLE series.<br>
It reduces the series into a single number (by looking at the max, min, average, or sum of values in the series).<br>
Statistics Panel also provides thresholds to color the stat or the Panel background.<br>
It can also translate the single number into a text value, and show a sparkline summary of the series.


## Install

If you want simply to run the plugin you will only need step 1. and 4.

1. Clone or copy the repo to your grafana plugin folder.
2. Install node dependencies with npm or yarn.
3. Start kubectl to acquire data.
```sh
kubectl [--kubeconfig <path to config file>] port-forward --namespace prod crate-0 4200:4200
```
4. Start docker-compose.
```sh
(...)/grafana_data/plugins/grafana_status_panel (master)$ docker-compose start grafana
```

## Development

To Build the source code just type
```sh
$ grunt
```
(Your user should have the group expected by grafana to avoid using sudo)
