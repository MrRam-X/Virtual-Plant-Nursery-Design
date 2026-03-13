// =================================================================================
// Planto - Common JavaScript File
// =================================================================================

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------------------------------------------
  // 1. Universal Logic (Applied to all pages)
  // -----------------------------------------------------------------------------

  // --- Mobile Header Menu Logic ---
  const headerMenuOpenBtn = document.getElementById("mobile-menu-open-button");
  const headerMenuCloseBtn = document.getElementById(
    "mobile-menu-close-button",
  );
  const headerMenu = document.getElementById("mobile-menu");
  if (headerMenu && headerMenuOpenBtn && headerMenuCloseBtn) {
    headerMenuOpenBtn.addEventListener("click", () => {
      headerMenu.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
    headerMenuCloseBtn.addEventListener("click", () => {
      headerMenu.classList.add("hidden");
      document.body.style.overflow = "";
    });
    // Also close when a nav link inside is clicked
    headerMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        headerMenu.classList.add("hidden");
        document.body.style.overflow = "";
      });
    });
  }

  // --- Header Profile Dropdown Logic ---
  const profileDropdownContainer = document.getElementById(
    "profile-dropdown-container",
  );
  const profileDropdownButton = document.getElementById(
    "profile-dropdown-button",
  );
  const profileDropdownPanel = document.getElementById(
    "profile-dropdown-panel",
  );
  if (
    profileDropdownButton &&
    profileDropdownPanel &&
    profileDropdownContainer
  ) {
    profileDropdownButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the document click listener from firing immediately
      profileDropdownPanel.classList.toggle("hidden");
      profileDropdownButton
        .querySelector(".fa-chevron-down")
        .classList.toggle("rotate-180");
    });
    // Also close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!profileDropdownContainer.contains(e.target)) {
        profileDropdownPanel.classList.add("hidden");
        profileDropdownButton
          .querySelector(".fa-chevron-down")
          .classList.remove("rotate-180");
      }
    });
  }

  // --- Reusable Accordion Logic (for Shopping & Product Detail pages) ---
  function attachAccordionListeners(container) {
    const accordionButtons = container.querySelectorAll(
      "[data-accordion-button]",
    );
    accordionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const panel = button.nextElementSibling;
        const icon = button.querySelector("i");
        panel.classList.toggle("hidden");
        if (panel.classList.contains("hidden")) {
          icon.classList.remove("fa-minus", "rotate-180");
          icon.classList.add("fa-plus");
        } else {
          icon.classList.remove("fa-plus");
          icon.classList.add("fa-minus", "rotate-180");
        }
      });
    });
  }
  // Attach listeners to the main document for any accordions present on the page
  attachAccordionListeners(document);

  // -----------------------------------------------------------------------------
  // 2. Page-Specific Logic
  // -----------------------------------------------------------------------------

  // --- Logic for Shopping Page ---
  const filterMenuOpenBtn = document.getElementById(
    "mobile-filter-open-button",
  );
  const customSortDropdown = document.getElementById("custom-sort-dropdown");

  if (filterMenuOpenBtn || customSortDropdown) {
    // --- Mobile Filter Panel Logic ---
    const filterMenuNode = document.querySelector(".lg\\:col-span-1 > .sticky");
    if (filterMenuOpenBtn && filterMenuNode) {
      const mobileFilterPanel = document.createElement("div");
      mobileFilterPanel.id = "mobile-filter-menu";
      mobileFilterPanel.className =
        "hidden fixed inset-0 bg-black bg-opacity-50 z-50";
      mobileFilterPanel.innerHTML = `<div class="absolute top-0 right-0 h-full w-full max-w-sm bg-brand-off-white shadow-xl p-6 overflow-y-auto"><div class="flex justify-between items-center mb-6"><h2 class="font-serif text-3xl text-brand-green">Filters</h2><button id="mobile-filter-close-button" class="text-gray-500 hover:text-brand-green"><i class="fas fa-times fa-2x"></i></button></div><div id="mobile-filter-content"></div></div>`;
      document.body.appendChild(mobileFilterPanel);
      const mobileFilterContent = document.getElementById(
        "mobile-filter-content",
      );
      mobileFilterContent.appendChild(filterMenuNode.cloneNode(true));
      attachAccordionListeners(mobileFilterContent);
      const filterMenu = document.getElementById("mobile-filter-menu");
      const filterMenuCloseBtn = document.getElementById(
        "mobile-filter-close-button",
      );
      filterMenuOpenBtn.addEventListener("click", () => {
        filterMenu.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
      filterMenuCloseBtn.addEventListener("click", () => {
        filterMenu.classList.add("hidden");
        document.body.style.overflow = "";
      });
      filterMenu.addEventListener("click", (e) => {
        if (e.target.id === "mobile-filter-menu") {
          filterMenu.classList.add("hidden");
          document.body.style.overflow = "";
        }
      });
    }

    // --- Custom Sort Dropdown Logic ---
    if (customSortDropdown) {
      const sortDropdownButton = document.getElementById(
        "sort-dropdown-button",
      );
      const sortDropdownPanel = document.getElementById("sort-dropdown-panel");
      const sortDropdownLabel = document.getElementById("sort-dropdown-label");
      const sortDropdownOptions = sortDropdownPanel.querySelectorAll("li");
      const sortDropdownIcon = sortDropdownButton.querySelector("i");
      sortDropdownButton.addEventListener("click", (e) => {
        e.stopPropagation();
        sortDropdownPanel.classList.toggle("hidden");
        sortDropdownIcon.classList.toggle("rotate-180");
      });
      sortDropdownOptions.forEach((option) => {
        option.addEventListener("click", () => {
          sortDropdownLabel.textContent = option.dataset.value;
          sortDropdownOptions.forEach((opt) =>
            opt.querySelector("i").classList.add("hidden"),
          );
          option.querySelector("i").classList.remove("hidden");
          sortDropdownPanel.classList.add("hidden");
          sortDropdownIcon.classList.remove("rotate-180");
        });
      });
    }
  }

  // --- Logic for Product Detail Page ---
  const imageGallery = document.getElementById("image-gallery");
  const quantitySelector = document.querySelector(".quantity-selector");

  if (imageGallery) {
    const mainImage = document.getElementById("main-product-image");
    const thumbnailButtons = document.querySelectorAll(".thumbnail-button");
    thumbnailButtons.forEach((button) => {
      button.addEventListener("click", () => {
        mainImage.src = button.querySelector("img").src;
        thumbnailButtons.forEach((btn) =>
          btn.classList.remove("border-brand-green"),
        );
        button.classList.add("border-brand-green");
      });
    });
  }

  if (quantitySelector) {
    const quantityInput = document.getElementById("quantity-input");
    quantitySelector.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      const action = button.dataset.action;
      let currentValue = parseInt(quantityInput.value);
      if (action === "increment") {
        quantityInput.value = currentValue + 1;
      } else if (action === "decrement" && currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  }

  // --- Logic for Profile / Account Page ---
  const desktopNavLinks = document.querySelectorAll(
    "#desktop-nav-links a[data-target]",
  );
  const mobileNavLinks = document.querySelectorAll(
    "#mobile-nav-links a[data-target]",
  );

  if (desktopNavLinks.length > 0 && mobileNavLinks.length > 0) {
    const contentPanels = document.querySelectorAll('[id$="-panel"]');
    function switchPanel(e) {
      e.preventDefault();
      const targetId = e.currentTarget.dataset.target;
      contentPanels.forEach((panel) => panel.classList.add("hidden"));
      document.getElementById(targetId).classList.remove("hidden");
      desktopNavLinks.forEach((link) => {
        link.classList.remove("bg-brand-green", "text-white");
        link.classList.add("hover:bg-gray-100");
        if (link.dataset.target === targetId) {
          link.classList.add("bg-brand-green", "text-white");
          link.classList.remove("hover:bg-gray-100");
        }
      });
      mobileNavLinks.forEach((link) => {
        link.classList.remove("border-brand-green", "text-brand-green");
        link.classList.add("border-transparent", "text-gray-500");
        if (link.dataset.target === targetId) {
          link.classList.add("border-brand-green", "text-brand-green");
          link.classList.remove("border-transparent", "text-gray-500");
        }
      });
    }
    desktopNavLinks.forEach((link) =>
      link.addEventListener("click", switchPanel),
    );
    mobileNavLinks.forEach((link) =>
      link.addEventListener("click", switchPanel),
    );
  }

  // --- Logic for Account Page Modal

  const confirmationModal = document.getElementById("confirmation-modal");
  const confirmationTitle = document.getElementById("confirmation-title");
  const confirmationMessage = document.getElementById("confirmation-message");
  const confirmBtn = document.getElementById("confirmation-confirm-btn");
  const cancelBtn = document.getElementById("confirmation-cancel-btn");

  const addressModal = document.getElementById("address-modal");
  const addressModalTitle = document.getElementById("address-modal-title");
  const addressForm = document.getElementById("address-form");
  const addressModalCloseBtn = document.getElementById(
    "address-modal-close-btn",
  );
  const addressModalCancelBtn = document.getElementById(
    "address-modal-cancel-btn",
  );

  let activeAction = null;
  let activeElementId = null;

  // --- General Modal Controls ---
  const openModal = (modal) => {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Add this line
  };

  const closeModal = (modal) => {
    modal.classList.add("hidden");
    document.body.style.overflow = ""; // Add this line
  };

  // --- Event Delegation for Triggers ---
  document.body.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-modal-trigger]");
    if (!trigger) return;

    const modalType = trigger.dataset.modalTrigger;
    const action = trigger.dataset.action;

    if (modalType === "confirmation") {
      const message = trigger.dataset.message || "Are you sure?";
      activeAction = action;
      activeElementId = trigger.dataset.addressId || trigger.dataset.formId;

      confirmationMessage.textContent = message;

      // Style confirm button based on action
      confirmBtn.className = "py-2 px-5 rounded-md font-semibold text-white";
      if (action === "deleteAddress") {
        confirmBtn.classList.add("bg-red-500", "hover:bg-red-600");
        confirmBtn.textContent = "Delete";
      } else {
        confirmBtn.classList.add(
          "bg-brand-green",
          "hover:bg-brand-green-light",
        );
        confirmBtn.textContent = "Confirm";
      }

      openModal(confirmationModal);
    }

    if (modalType === "address") {
      if (action === "edit") {
        addressModalTitle.textContent = "Edit Address";
        // In a real app, you'd fetch this data. We'll simulate it.
        const mockData = {
          label: "Home",
          full: "123 Green St, Flora City, USA, 12345",
          city: "Flora City",
          state: "USA",
        };
        document.getElementById("address-label").value = mockData.label;
        document.getElementById("address-full").value = mockData.full;
        document.getElementById("address-city").value = mockData.city;
        document.getElementById("address-state").value = mockData.state;
      } else {
        // 'add'
        addressModalTitle.textContent = "Add New Address";
        addressForm.reset();
      }
      openModal(addressModal);
    }
  });

  // --- Confirmation Modal Listeners ---
  if (confirmationModal) {
    cancelBtn.addEventListener("click", () => closeModal(confirmationModal));
    confirmationModal.addEventListener("click", (e) => {
      if (e.target === confirmationModal) closeModal(confirmationModal);
    });
    confirmBtn.addEventListener("click", () => {
      console.log(
        `Executing action: ${activeAction} for ID: ${activeElementId}`,
      );
      // Add your actual logic here (e.g., form.submit(), API call)
      // Example: if (activeAction === 'clearForm') document.getElementById(activeElementId).reset();
      closeModal(confirmationModal);
    });
  }

  // --- Address Modal Listeners ---
  if (addressModal) {
    addressModalCloseBtn.addEventListener("click", () =>
      closeModal(addressModal),
    );
    addressModalCancelBtn.addEventListener("click", () =>
      closeModal(addressModal),
    );
    addressModal.addEventListener("click", (e) => {
      if (e.target === addressModal) closeModal(addressModal);
    });
    addressForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Saving address data...");
      // Add your actual logic here (e.g., form submission via fetch/axios)
      closeModal(addressModal);
    });
  }
});
