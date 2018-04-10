# Statistics Panel - External Grafana Plugin

The Statistics Panel allows you to show the one main summary stat of a SINGLE series.<br>
It reduces the series into a single number (by looking at the max, min, average, or sum of values in the series).<br>
Statistics Panel also provides thresholds to color the stat or the Panel background.<br>
It can also translate the single number into a text value, and show a sparkline summary of the series.


## Install

If you want simply to run the plugin you will only need step 1. and 4.

1. Clone or copy the repo to your grafana plugin folder
2. Install node dependencies with npm or yarn
3. Build the source code.<br>
   One way is by simply execute `$ grunt`<br>
   (Your user should have the group expected by grafana to avoid using sudo)
4. Restart your grafana instance

