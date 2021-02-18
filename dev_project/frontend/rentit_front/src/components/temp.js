title: yup
.string('Enter your Room name')
.required('Room name is required'),

wifi: yup
.boolean()
.required('You must answer this '),

cost_wifi: yup
.number().integer('please enter integer'),


removable_wifi: yup
.boolean()
.required('You must answer this '),

house_TV: yup
.boolean()
.required('You must answer this '),

cost_TV: yup
.number().integer('please enter integer'),


removable_house_TV: yup
.boolean()
.required('You must answer this '),

room_TV: yup
.boolean()
.required('You must answer this '),

cost_roomTV: yup
.number().integer('please enter integer'),


removable_room_TV: yup
.boolean()
.required('You must answer this '),

house_refridgerator: yup
.boolean()
.required('You must answer this '),

cost_refridgerator: yup
.number().integer('please enter integer'),


title: yup
.string('Enter your Room name')
.required('Room name is required'),

wifi: yup
.boolean()
.required('You must answer this '),

cost_wifi: yup
.number().integer('please enter integer'),


removable_wifi: yup
.boolean()
.required('You must answer this '),

house_TV: yup
.boolean()
.required('You must answer this '),

cost_TV: yup
.number().integer('please enter integer'),


removable_house_TV: yup
.boolean()
.required('You must answer this '),

room_TV: yup
.boolean()
.required('You must answer this '),

cost_roomTV: yup
.number().integer('please enter integer'),


removable_room_TV: yup
.boolean()
.required('You must answer this '),

house_refridgerator: yup
.boolean()
.required('You must answer this '),

room_refridgerator: yup
.boolean()
.required('You must answer this '),

cost_roomrefridgerator: yup
.number().integer('please enter integer'),


removable_room_refridgerator: yup
.boolean()
.required('You must answer this '),

purified_water: yup
.boolean()
.required('You must answer this '),

cost_purified_water: yup
.number().integer('please enter integer'),


removable_purified_water: yup
.boolean()
.required('You must answer this '),

AC: yup
.boolean()
.required('You must answer this '),

cost_AC: yup
.number().integer('please enter integer'),


removable_AC: yup
.boolean()
.required('You must answer this '),

geyser: yup
.boolean()
.required('You must answer this '),

cost_geyser: yup
.number().integer('please enter integer'),


removable_geyser: yup
.boolean()
.required('You must answer this '),

cooler: yup
.boolean()
.required('You must answer this '),

cost_cooler: yup
.number().integer('please enter integer'),


removable_cooler: yup
.boolean()
.required('You must answer this '),

breakfast: yup
.boolean()
.required('You must answer this '),

cost_breakfast: yup
.number().integer('please enter integer'),


removable_breakfast: yup
.boolean()
.required('You must answer this '),

lunch: yup
.boolean()
.required('You must answer this '),

cost_lunch: yup
.number().integer('please enter integer'),


removable_lunch: yup
.boolean()
.required('You must answer this '),

dinner: yup
.boolean()
.required('You must answer this '),

cost_dinner: yup
.number().integer('please enter integer'),


removable_dinner: yup
.boolean()
.required('You must answer this '),

laundry: yup
.boolean()
.required('You must answer this '),

cost_laundry: yup
.number().integer('please enter integer'),


iron: yup
.boolean()
.required('You must answer this '),

cost_iron: yup
.number().integer('please enter integer'),


room_cleaning: yup
.boolean()
.required('You must answer this '),

cost_room_cleaning: yup
.number().integer('please enter integer'),


capacity: yup
.number().integer('please enter integer'),

windows: yup
.number().integer('please enter integer'),

floor_no: yup
.number().integer('please enter integer'),

cost_electricity: yup
.number().integer('please enter integer'),


cost_water: yup
.number().integer('please enter integer'),


category: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

city: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

state: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

country: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

separate_washroom: yup
.boolean()
.required('You must answer this '),

location: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

landmark: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

pincode: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

length: yup
.number().integer('please enter integer'),


breadth: yup
.number().integer('please enter integer'),



height: yup
.number().integer('please enter integer'),


fans: yup
.number().integer('please enter integer'),

bed_type: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

description: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

furniture: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

building_guard: yup
.boolean()
.required('You must answer this '),

cctv_building: yup
.boolean()
.required('You must answer this '),

power_backup: yup
.boolean()
.required('You must answer this '),

veg_food: yup
.boolean()
.required('You must answer this '),

nonveg_food: yup
.boolean()
.required('You must answer this '),

seller_price: yup
.number().integer('please enter integer'),


owner_discount: yup
.number().integer('please enter integer'),

guest_allowed: yup
.boolean()
.required('You must answer this '),

longitude: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

latitude: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

balcony: yup
.number().integer('please enter integer'),

distance1: yup
.number().required('please enter this'),

distance2: yup
.number().required('please enter this'),

nearby_station1: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

nearby_station2: yup
.string('Please, provide the appropriate answer')
.required('You must answer this '),

photo1: yup.mixed().when("edit", {
    is: false,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo1: yup.mixed().when("input1", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),



  photo2: yup.mixed().when("edit", {
    is: false,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo2: yup.mixed().when("input2", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo3: yup.mixed().when("edit", {
    is: false,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo3: yup.mixed().when("input3", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo4: yup.mixed().when("edit", {
    is: false,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo4: yup.mixed().when("input4", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo5: yup.mixed().when("edit", {
    is: false,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo5: yup.mixed().when("input5", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

address_proof: yup.mixed().when("edit", {
    is: false,
    then: yup.mixed().required("A file is required")
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS1.includes(value.type)
    ),
  }),

  address_proof: yup.mixed().when("newfile", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS1.includes(value.type)
    ),
  }),