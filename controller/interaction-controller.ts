import { Interaction, InteractionDTO, InteractionResponse } from '../models/interaction/interaction.js'
import { Block, generateSlates } from '../models/slate/block-model.js'
import * as fs from 'node:fs'

class InteractionController {
  static instance: InteractionController

  mainTableHtml = `
\`
<style>
    table {
        width: 100%;
        border-collapse: collapse;
        padding: 8px;
    }

    th {
        border-bottom: black 1px solid;
    }

    td {
        border-bottom: #cccccc 1px solid;
    }

    td, th {
        padding: 8px;
        text-align: left;
    }
    
    tr {
        background-color: white;
        cursor: pointer;
    }
    
    tr:hover {
        background-color: #cccccc;
        transition: background-color 0.3s;
    }
</style>
<script>
  function rowClicked(index) {
    window.location.href = '${process.env.TABLE_ROW_SPACE_RELATIVE_URL ?? "/"}?row=' + (index + 1)
  }
</script>
<table class="table-auto hover:table-fixed">
  <thead>
  <th>
    Column 1
  </th>
  <th>
    Column 2
  </th>
  <th>
    Column 3
  </th>
  </thead>
  <tr onclick="rowClicked(0)">
    <td>
      Row 1 Column 1
    </td>
    <td>
      Row 1 Column 2
    </td>
    <td>
      Row 1 Column 3
    </td>
  </tr>
  <tr onclick="rowClicked(1)">
    <td>
      Row 2 Column 1
    </td>
    <td>
      Row 2 Column 2
    </td>
    <td>
      Row 2 Column 3
    </td>
  </tr>
  <tr onclick="rowClicked(2)">
    <td>
      Row 3 Column 1
    </td>
    <td>
      Row 3 Column 2
    </td>
    <td>
      Row 3 Column 3
    </td>
  </tr>
</table>
\`
`
  tableRowHtml = `
<script>
document.getElementsByName('cta-' + (new URLSearchParams(window.location.search)).get('row'))[0].classList.remove('hidden')
</script>
`

  handleTableDynamicBlockInteraction(body: InteractionDTO): InteractionResponse {
    return {
      data: {
        appId: body.data.appId,
        interactionId: body.data.interactionId,
        interactions: [
          Interaction.show({
            id: body.data.interactionId,
            props: undefined,
            slate: {
              rootBlock: 'root',
              blocks: [
                ...generateSlates(
                  Block.card([
                    Block.cardHeader([], {
                      title: 'Table Data',
                    }),
                    Block.container([
                      Block.htmlScript([], {
                        html: this.mainTableHtml,
                      }),
                    ], {
                      padding: 'lg',
                    }),
                  ], {}),
                ),
              ],
            },
          }),
        ],
      },
      status: 'SUCCEEDED',
      type: 'INTERACTION',
    }
  }

  handleRowDynamicBlockInteraction(body: InteractionDTO): InteractionResponse {
    return {
      status: 'SUCCEEDED',
      type: 'INTERACTION',
      data: {
        appId: body.data.appId,
        interactionId: body.data.interactionId,
        interactions: [
          Interaction.show({
            id: body.data.interactionId,
            props: undefined,
            slate: {
              rootBlock: 'root',
              blocks: generateSlates(
                Block.form([
                  Block.htmlScript([], {
                    html: this.tableRowHtml,
                    className: 'hidden',
                    wrapper: 'none',
                  }),
                  Block.callToAction([], {
                    title: `Call To Action For Row 1`,
                    alignment: 'center',
                    className: 'hidden',
                    name: `cta-1`,
                  }),
                  Block.callToAction([], {
                    title: `Call To Action For Row 2`,
                    alignment: 'center',
                    className: 'hidden',
                    name: `cta-2`,
                  }),
                  Block.callToAction([], {
                    title: `Call To Action For Row 3`,
                    alignment: 'center',
                    className: 'hidden',
                    name: `cta-3`,
                  }),
                ], {}),
              ),
            },
          }),
        ],
      },
    }
  }

  static getInstance() {
    if (!InteractionController.instance) {
      InteractionController.instance = new InteractionController()
    }
    return InteractionController.instance
  }
}

export default InteractionController