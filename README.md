# Create Table Slate

## Overview

1. **Create an App and Install It**
    - Obtain `client_id`, `client_secret`, and `webhook_signing_secret`.

2. **Setup Dynamic Blocks**
    - Create two dynamic blocks: `main-table` and `table-row`.
    - Add dynamic blocks to your desired space.

3. **Create a `.env` File from `.env.example`**
    ```sh
    NODE_APP_PORT=3000
    CLIENT_ID=XXXXXXX-XXXXXXXXXXXXXXXXX
    CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
    WEBHOOK_SIGNING_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
    NETWORK_ID=XXXXXXXX
    TABLE_ROW_SPACE_RELATIVE_URL=/space-relative-url
    ```

4. **Check `controller/interaction-controller` for modifying dynamic block responses**

5. **Run the Project**

## Installation

1. Install the dependencies:
   ```sh
   npm install
    ```
2. Run the project:
   ```sh
   npm start
    ```
3. The project will be running on `http://localhost:3000`.