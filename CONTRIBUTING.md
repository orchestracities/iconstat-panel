# Building Icon Stat Panel

## Requirements
- git
- npm / yarn

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
    yarn dev && docker-compose restart grafana
    ```

5. Build plugin in production mode

   ```bash
   yarn build
   ```

## Learn more

- [Build a panel plugin tutorial](https://grafana.com/tutorials/build-a-panel-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
- [Using Font Awesome with React](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react)
