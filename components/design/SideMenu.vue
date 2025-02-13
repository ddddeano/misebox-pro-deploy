<!-- components/design/SideMenu.vue -->
<!-- components/designSystem/SideMenu.vue -->
<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li>Atoms</li>

        <li>
          Molecules
          <ul class="sub-links">
            <li>
              <NuxtLink to="/design-system/molecules/cells" active-class="active">
                Cells
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/design-system/molecules/cards" active-class="active">
                Cards
              </NuxtLink>
            </li>
          </ul>
        </li>

        <li>Organisms</li>

        <li>
          Entity
          <ul class="sub-links">
            <li>
              <NuxtLink to="/design-system/entities" active-class="active">
                Entities
              </NuxtLink>
            </li>
          </ul>
        </li>

        <li>
          Object
          <ul class="sub-links">
            <li>
              <NuxtLink to="/design-system/entities/objects" active-class="active">
                Objects
              </NuxtLink>
            </li>
          </ul>
        </li>

      </ul>
    </nav>
  </aside>
</template>

<script setup>
// No additional logic required for the side menu component.
</script>

<style scoped>
.sidebar {
  width: 150px;
  background: var(--background-strong);
  padding: 1rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  margin-bottom: 1rem;
}
.sidebar a {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: bold;
}
.sidebar a.active {
  color: var(--color-primary, #007bff);
}

/* Style for Molecules, Entity & Object sub-links */
.sub-links {
  margin-top: 0.5rem;
  margin-left: 1rem;
}
.sub-links li {
  margin-bottom: 0.5rem;
}
</style>
