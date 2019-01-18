<template>
  <div id="test">{{text}}</div>
</template>
<script>
export default {
  dat() {
    return {
      text: "abc"
    };
  }
};
</script>

<style>
#test {
  color: red;
}
</style>
