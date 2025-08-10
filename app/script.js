// gsap.registerPlugin(MotionPathPlugin, Draggable, InertiaPlugin);

// Helper function to get motion path length and spacing
function getPathProperties(pathSelector, itemCount) {
  const pathLength = MotionPathPlugin.getLength(pathSelector);
  const spacing = pathLength / (itemCount + 1); // Spacing between items
  return { pathLength, spacing };
}

// Function to animate items in along the path with a fade-in effect
function animateListIn(
  listSelector,
  pathSelector,
  delayStart = 0,
  itemSpacing = 0.2,
  alignOriginX = 0.5
) {
  const items = gsap.utils.toArray(`${listSelector} li`);
  const { pathLength, spacing } = getPathProperties(pathSelector, items.length);

  // Loop through each item and set initial animation state
  items.forEach((item, index) => {
    gsap.set(item, { opacity: 0, x: -item.offsetWidth / 2 }); // Set initial hidden state

    gsap.to(item, {
      duration: 2.5,
      delay: delayStart + index * itemSpacing,
      motionPath: {
        path: pathSelector,
        align: pathSelector,
        autoRotate: false,
        alignOrigin: [alignOriginX, 0.5], // Control positioning along the path
        start: (spacing * index) / pathLength,
        end: (spacing * (index + 1)) / pathLength,
      },
      opacity: 1, // Fade the item in
      ease: 'power2.inOut',
    });
  });
}

// Function to place items along the path and make them draggable
function makeListDraggable(listSelector, pathSelector) {
  const items = gsap.utils.toArray(`${listSelector} li`);
  const { pathLength, spacing } = getPathProperties(pathSelector, items.length);
  let currentOffset = 0;
  let dragMultiplier = 0.05; // Adjust to control drag speed

  // Initialize each item on the motion path
  items.forEach((item, index) => {
    gsap.set(item, {
      motionPath: {
        path: pathSelector,
        align: pathSelector,
        alignOrigin: [0.5, 0.5],
        start: (spacing * index) / pathLength,
        end: (spacing * (index + 1)) / pathLength,
      },
    });
  });

  // Draggable functionality along the path
  Draggable.create(items, {
    type: 'x', // Drag along the x direction
    onDrag: function () {
      const delta = this.deltaX * dragMultiplier;
      currentOffset += delta;

      // Update each item's position based on drag movement
      items.forEach((item, index) => {
        let newStart = (spacing * index + currentOffset) / pathLength;
        let newEnd = (spacing * (index + 1) + currentOffset) / pathLength;

        if (newStart >= 1) newStart -= 1; // Loop around
        if (newEnd >= 1) newEnd -= 1;

        gsap.to(item, {
          motionPath: {
            path: pathSelector,
            align: pathSelector,
            autoRotate: false,
            start: newStart,
            end: newEnd,
          },
          duration: 0, // Instantly update position
        });
      });
    },
    inertia: true, // Smooth continued motion after release
    onThrowUpdate: function () {
      items.forEach((item, index) => {
        let newStart = (spacing * index + currentOffset) / pathLength;
        let newEnd = (spacing * (index + 1) + currentOffset) / pathLength;

        if (newStart >= 1) newStart -= 1; // Loop around
        if (newEnd >= 1) newEnd -= 1;

        gsap.to(item, {
          motionPath: {
            path: pathSelector,
            align: pathSelector,
            autoRotate: false,
            start: newStart,
            end: newEnd,
          },
          duration: 0, // Instant update during inertia
        });
      });
    },
  });
}

// Example usage with outer and inner paths
// First animate them onto the path, then make them draggable
animateListIn('#tagsList', '#hidden_outer', 5, 0.1, -1.1); // Animate tags list in along the outer path
animateListIn('#textList', '#hidden_inner', 2, 0.1, 0.8); // Animate text list in along the inner path

// After the animation completes, make them draggable
setTimeout(() => {
  makeListDraggable('#tagsList', '#hidden_outer');
  makeListDraggable('#textList', '#hidden_inner');
}, 3000); // Delay to ensure animation finishes before enabling dragging
