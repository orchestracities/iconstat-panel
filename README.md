# Orchestra Cities - Stat Panel
This plugin extends Grafana Stat panel with icons support. More info at https://grafana.com/docs/grafana/latest/visualizations/stat-panel/

Icons supported are from [FontAwesome](https://fontawesome.com/)

## What is Grafana Panel Plugin?

Panels are the building blocks of Grafana. They allow you to visualize data in different ways. While Grafana has several types of panels already built-in, you can also build your own panel, to add support for other visualizations.

For more information about panels, refer to the documentation on [Panels](https://grafana.com/docs/grafana/latest/features/panels/panels/)

## Set up dev environment

1. Launch services

    ```bash
    docker-compose up -d
    ```

2. Import database

    ```bash
    sh config.sh
    sh create-table.sh
    ```


3. Set-up grafana

    ```bash
    sh set-up-grafana.sh
    ```


4. In case of changes to code to restart grafana

    ```bash
    yarn build & docker-compose restart grafana
    ```


## Getting started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Build plugin in development mode or run in watch mode

   ```bash
   yarn dev
   ```

   or

   ```bash
   yarn watch
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

## Learn more

- [Build a panel plugin tutorial](https://grafana.com/tutorials/build-a-panel-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
- [Using Font Awesome with React](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react)
