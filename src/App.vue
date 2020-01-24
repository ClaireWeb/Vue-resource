<template>
  <div id="app" class="ui container">
    <div class="ui active dimmer" v-if="loading">
      <div class="ui loader"></div>
    </div>
    <div class="ui four column grid">
      <div class="column" v-for="user in users" :key="user.id">
        <div class="ui card">
          <div class="content">
            <div class="header">
              <input type="text" v-model="user.name" style="width:100%" />
            </div>
            <div class="meta">
              <a href="#">Friends</a>
            </div>
            <div class="description">
              {{ user.address.street }} <br />
              {{ user.address.zipcode }} {{ user.address.city }} <br />
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <button class="ui basic green button" @click="save(user)">
                <i class="edit icon"></i>
              </button>
              <button class="ui basic red button" @click="destroy(user)">
                <i class="trash icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      users: [],
      loading: false
    }
  },
  components: {},
  methods: {
    save(user) {
      this.$user
        .update(
          { id: user.id },
          {
            name: user.name
          }
        )
        .then(
          res => {
            console.log(res.data.name)
          },
          res => {
            console.log('error', res)
          }
        )
    },
    destroy(user) {
      this.$user.remove({ id: user.id }).then(
        res => {
          this.users = this.users.filter(u => u !== user)
          console.log('delete success', res)
        },
        res => {
          console.log('error', res)
        }
      )
    }
  },
  mounted() {
    // Définit toutes les requêtes, et mets en place un système de loader à chaque requête
    this.$user = this.$resource(
      'users{/id}',
      {},
      {},
      {
        before: () => {
          this.loading = true
        },
        after: () => {
          this.loading = false
        }
      }
    )

    this.$user.query().then(
      res => {
        this.users = res.data
        // Si on a un doute sur le format renvoyé, permet de récupérer du json:
        // res.json().then(data => {
        //   this.users = data
        // })
      },
      res => {
        console.log('error', res)
      }
    )
  }
}
</script>

<style></style>
