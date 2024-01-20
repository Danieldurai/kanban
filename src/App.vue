<template>
  <div id="app">
    <button class="create-task-btn" @click="openBasic">+</button>
    <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
      <div
        v-for="block in blocks"
        :slot="block.id"
        :key="block.id"
        class="task-container"
      >
        <div>
          {{ block.title }}
        </div>
        <div class="options-container">
          <i class="fas fa-edit"></i>
          <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
    </kanban-board>
    <Dialog
      header="Header "
      :visible.sync="displayBasic"
      :containerStyle="{ width: '50vw' }"
    >
      <div class="task-name-container">
        <div>
          <span>Task Name: </span>
          <InputText v-model="taskName"></InputText>
        </div>
        <div>
          <label>Status</label>
        </div>
        <div
          v-for="category of categories"
          :key="category.key"
          class="field-radiobutton"
        >
          <RadioButton
            :id="category.key"
            name="category"
            :value="category"
            v-model="selectedCategory"
            :disabled="category.key === 'R'"
            @click="updateStatus(category.value)"
          />
          <label :for="category.key">{{ category.name }}</label>
        </div>
      </div>
      <template #footer>
        <Button label="Save" icon="pi pi-check" @click="addTask" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";

export default {
  name: "App",
  data() {
    return {
      taskName: "",
      displayBasic: false,
      stages: ["on-hold", "in-progress", "needs-review", "approved"],
      blocks: [],
      city: null,
      categories: [
        { name: "On Hold", key: "A", value: "on-hold" },
        { name: "In Progress", key: "M", value: "in-progress" },
        { name: "Needs Review", key: "P", value: "needs-review" },
        { name: "Approved", key: "R", value: "approved" },
      ],
      selectedCategory: null,
    };
  },
  components: {
    Dialog,
    Button,
    InputText,
    RadioButton,
  },
  methods: {
    addTask() {
      console.log(this.selectedCategory.value, this.taskName);
      axios
        .post("http://localhost:3000/tasks", {
          title: this.taskName,
          status: this.selectedCategory.value,
        })
        .then((response) => {
          console.log("Response from server:", response.data);
          this.blocks = response.data;
          // Handle the response as needed
        })
        .catch((error) => {
          console.error("Error sending POST request:", error);
          // Handle errors
        });
      this.taskName = "";
      this.selectedCategory = "";
    },
    updateStatus(status) {
      this.selectedCategory = status;
      console.log(this.selectedCategory, "CAT");
    },
    updateBlock(id, status) {
      console.log(status, id, Number(id));
      const blockToUpdate = this.blocks.find((b) => b.id === Number(id));
      if (blockToUpdate) {
        blockToUpdate.status = status;
      }
    },
    openBasic() {
      this.displayBasic = true;
    },
    closeBasic() {
      this.displayBasic = false;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        this.blocks = res.data;
        console.log(this.blocks);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>

<style>
#app {
  .task-name-container {
    padding: 0 1rem;
  }
  .create-task-btn {
    position: fixed;
    width: 50px;
    cursor: pointer;
    font-size: 30px;
    height: 50px;
    bottom: 100px;
    right: 100px;
    border-radius: 50%;
    color: white;
    background-color: green;
    outline: none;
    border: none;
  }
  .task-container {
    display: flex;
    justify-content: space-between;
    i {
      cursor: pointer;
    }
  }
  .options-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ul.drag-list,
  ul.drag-inner-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .drag-container {
    max-width: 1000px;
    margin: 20px auto;
  }

  .drag-list {
    display: flex;
    align-items: flex-start;
  }
  @media (max-width: 690px) {
    .drag-list {
      display: block;
    }
  }

  .drag-column {
    border-radius: 0.3rem;
    flex: 1;
    margin: 0 10px;
    position: relative;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  .drag-column-on-hold {
    .drag-column-header {
      background-color: #ff0000b8;
    }
  }

  .drag-column-in-progress {
    .drag-column-header {
      background-color: #800080bf;
    }
  }
  .drag-column-needs-review {
    .drag-column-header {
      background-color: #ffff00b3;
    }
  }
  .drag-column-approved {
    .drag-column-header {
      background-color: #008000a8;
    }
  }
  @media (max-width: 690px) {
    .drag-column {
      margin-bottom: 30px;
    }
  }
  .drag-column h2 {
    font-size: 0.8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 600;
  }

  .drag-column-header {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .drag-inner-list {
    min-height: 50px;
    color: white;
  }

  .drag-item {
    padding: 10px;
    margin: 10px;
    border-radius: 0.3rem;
    color: black;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    height: 100px;
    background: white;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .drag-item.is-moving {
    /* transform: scale(1.5); */
    background: rgba(0, 0, 0, 0.8);
  }

  .drag-header-more {
    cursor: pointer;
  }

  .drag-options {
    position: absolute;
    top: 44px;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .drag-options.active {
    transform: translateX(0);
    opacity: 1;
  }
  .drag-options-label {
    display: block;
    margin: 0 0 5px 0;
  }
  .drag-options-label input {
    opacity: 0.6;
  }
  .drag-options-label span {
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 400;
    margin-left: 5px;
  }

  /* Dragula CSS  */
  .gu-mirror {
    position: fixed !important;
    margin: 0 !important;
    z-index: 9999 !important;
    opacity: 0.8;
    list-style-type: none;
  }

  .gu-hide {
    display: none !important;
  }

  .gu-unselectable {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
  }

  .gu-transit {
    opacity: 0.2;
  }
}
</style>
