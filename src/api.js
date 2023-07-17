const api_link = "http://localhost:3000/";

export const login = async (email, password) => {
  const response = await fetch(`${api_link}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const res = await response.json();
  if (res.success) {
    localStorage.setItem("token", res.token);
    return true;
  } else {
    return false;
  }
};

export const fetchSL = async () => {
  const response = await fetch(`${api_link}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();

  if (res.Success) {
    console.log(res.data[0].item);
    return res.data;
  } else {
    return res.error;
  }
};

export const fetchML = async () => {
  const response = await fetch(`${api_link}/main_item_pricings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();

  if (res.Success) {
    console.log(res.data[0].item);
    return res.data;
  } else {
    return res.error;
  }
};

export const fetchCL = async () => {
  const response = await fetch(`${api_link}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();

  if (res.success) {
    console.log(res);
    return res.data;
  } else {
    return res.error;
  }
};

export const update = async (id, price) => {
  const response = await fetch(`${api_link}/supplier_item_pricings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sip: {
        new_purchase_price: price,
      },
    }),
  });

  const res = await response.json();

  if (res.Success) {
    return true;
  } else {
    return false;
  }
};
