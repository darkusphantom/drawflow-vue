<template>
  <div class="card">
    <div class="card-container">
      <p class="card-title">
        Card:
        <span> type number </span>
      </p>
      <div class="card-type">
        <label for="type">Ingresa el tipo:</label>
        <input
          type=""
          name="type"
          placeholder="Tipo de dato bool, int, float..."
        />
      </div>
      <div class="card-value">
        <label for="value">Ingrese un valor:</label>
        <input type="text" name="value" placeholder="Ingrese un valor..." />
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.card {
  width: 320px;
  height: 230px;
  background: rgba(25, 42, 67, 0.2);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px black;
}

.card-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
}

.card-title span {
  font-size: 1.2rem;
  font-weight: normal;
  text-transform: capitalize;
}

.card-type,
.card-value {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-type label,
.card-value label {
  text-align: center;
  margin-bottom: 8px;
}

.card-type input {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid black;
  background: transparent;
  width: 40%;
  text-align: center;
  transition: width ease-in-out 0.25s;
}

.card-value input {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  width: 50%;
  text-align: center;
  transition: width ease-in-out 0.25s;
}

.card-type input:focus,
.card-value input:focus {
  width: 80%;
}
</style>
