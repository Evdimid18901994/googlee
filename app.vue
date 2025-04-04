<template>
  <main class="h-screen flex flex-col justify-center items-center gap-[40px]">

    <form class = "flex flex-row gap-4 flex-wrap" @submit.prevent = "postData">
      <div class = "flex flex-col gap-2">
        <label name = "setname">Insert Name</label>
        <input class = "border-[2px] border-gray-400 text-center" name="setname" type="text" placeholder="Insert any name" v-model="postname" />
      </div>

      <div class = "flex flex-col gap-2">
        <label name = "setage">Insert age</label>
        <input class = "border-[2px] border-gray-400 text-center"  name="setage" type="number" placeholder="Insert any age" v-model="postage" />
      </div>

      <div class = "flex flex-col gap-2">
        <label name = "setemail">Insert email</label>
        <input class = "border-[2px] border-gray-400 text-center" name="setemail" type="text" placeholder="Insert any email" v-model="postemail" />
      </div>

      <div class = "flex flex-col gap-2">
        <label name = "setphone">Insert phone</label>
        <input class = "border-[2px] border-gray-400 text-center" name="setphone" type="text" placeholder="Insert any phone" v-model="postphone" />
      </div>
      <button class = "w-[100px] bg-green-900 hover:bg-red-900 text-white rounded-xl" type="submit">POST</button>
      </form>

    <form class = "flex flex-row gap-4 flex-wrap" @submit.prevent="fetchData">
      <div class = "flex flex-col gap-2">
      <label for="name">Filter by name</label>
      <input class = "border-[2px] border-gray-400 text-center" name="name" type="text" placeholder="put in any name" v-model="getname" />
      </div>
     
      <div class = "flex flex-col gap-2">
      <label for="age">Filter by age</label>
      <input class = "border-[2px] border-gray-400 text-center" name="age" type="number" placeholder="put in any age" v-model="getage" />
      </div>

      <button class = "w-[100px] bg-blue-900 hover:bg-red-900 rounded-xl text-white" type="submit">Find</button>
    </form>
    <table class="border-collapse border border-gray-300">
      <thead>
        <tr>
          <td class="border border-gray-300 px-4 py-2">Id</td>
          <td class="border border-gray-300 px-4 py-2">Name</td>
          <td class="border border-gray-300 px-4 py-2">Age</td>
          <td class="border border-gray-300 px-4 py-2">Email</td>
          <td class="border border-gray-300 px-4 py-2">Phone</td>
          <td class="border border-gray-300 px-4 py-2">CreatedAt</td>
          <td class="border border-gray-300 px-4 py-2">Delete</td>
          <td class="border border-gray-300 px-4 py-2">Update</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in data" :key="customer.id">
          <td class="border border-gray-300 px-4 py-2">{{ customer.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ customer.name }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ customer.age }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ customer.email }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ customer.phone }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ customer.createdat }}</td>
          <td class="border border-gray-300 px-4 py-2"><button @click = "deleteData(customer.id)" 
            class = " w-[40px] rounded-full bg-red-800 hover:bg-yellow-800 text-white font-bold">X</button></td>
          <td class="border border-gray-300 px-4 py-2"><button @click = "updateData(customer.id)" 
            class = " w-[40px] rounded-full bg-green-800 hover:bg-red-800 text-white font-bold">U</button></td>
        </tr>
      </tbody>
    </table>

    <div class = "flex fixed inset-0 items-center justify-center bg-black bg-opacity-50 border-2 border-gray-900" v-show = "modal">
    <form @submit.prevent = "putData" class = "flex flex-row gap-4 flex-wrap">
      <div class = "flex flex-col gap-2">
        <label name = "setname">Update Name</label>
        <input class = "border-[2px] border-gray-400 text-center" name="setname" type="text" placeholder="Insert any name" v-model="putname" />
      </div>

      <div class = "flex flex-col gap-2">
        <label name = "setage">Update age</label>
        <input class = "border-[2px] border-gray-400 text-center"  name="setage" type="number" placeholder="Insert any age" v-model="putage" />
      </div>

      <div class = "flex flex-col gap-2">
        <label name = "setemail">Update email</label>
        <input class = "border-[2px] border-gray-400 text-center" name="setemail" type="text" placeholder="Insert any email" v-model="putemail" />
      </div>

      <div class = "flex flex-col gap-2">
        <label name = "setphone">Update phone</label>
        <input class = "border-[2px] border-gray-400 text-center" name="setphone" type="text" placeholder="Insert any phone" v-model="putphone" />
      </div>
      <button @click = "modal = false" class = "w-[100px] h-[30px] bg-green-900 hover:bg-red-900 text-white rounded-xl" type="button">Cancel</button>
      <button @click = "modal = false" class = "w-[100px] h-[30px] bg-green-900 hover:bg-red-900 text-white rounded-xl" type="submit">PUT</button>
      </form>
      </div>

  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';



const getname = ref<string>(""); 
const getage = ref<number>(0); 
const data = ref<any[]>([]); 

const postname = ref<string>("")
const postage = ref<number>(0)
const postemail = ref<string>("")
const postphone = ref<string>("")

const selectedId = ref<number | null>(null)
const putname = ref<string>("")
const putage = ref<number>(0)
const putemail = ref<string>("")
const putphone = ref<string>("")

const modal = ref<boolean>(false)

// Fetch the data when the form is submitted
const fetchData = async () => {
    const response = await $fetch('api/customers', {
      params: { name: getname.value,
                age: getage.value
       },
    });
    data.value = response.getus || response; // Adjust based on actual data structure
};
const postData = async () => {
  if (!postname.value || !postage.value || !postemail.value || !postphone.value) {
    alert('Please fill in all form fields')
    return
  }

  const posts = await $fetch("api/customers",{
    method: "POST",
    body: {
      name: postname.value,
      age: postage.value,
      email: postemail.value,
      phone: postphone.value
    }
  }
  )
}

const deleteData = async (index:number)=> {
  const DelEte = await $fetch("api/customers", {
    method: "DELETE",
    body: {
      id: index
    }
  })
}


const updateData = (index:number) => {

  const customer = data.value.find(c=> c.id === index)
  if (!customer) return 

  selectedId.value = customer.id
  putname.value = customer.name
  putemail.value = customer.email
  putphone.value = customer.phone

  modal.value = true
}

const putData = async ()=> {

  if (selectedId.value === null)
  return

  const puts = await $fetch('api/customers', {
    method: "PUT",
    body: {
      id: selectedId.value,
      name: putname.value,
      age: putage.value,
      email: putemail.value,
      phone: putphone.value
    }
  })

}

</script>
