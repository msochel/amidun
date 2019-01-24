<template>
  <b-navbar toggleable type="light" variant="light">
    <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
    <b-navbar-brand>
      <img src="../media/img-001-header.png" class="d-inline-block" alt="BV" />
      AMID-UN
    </b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav>
        <b-nav-text></b-nav-text>
        <b-navbar-brand right>
          <b-button-group >
            <b-button variant="success">
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
            </b-button>
            <b-button variant="info">
              <i class="fa fa-folder-open-o" aria-hidden="true"></i>
            </b-button>
          </b-button-group>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
