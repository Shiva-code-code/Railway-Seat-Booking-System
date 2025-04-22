exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    console.log("📥 Register attempt:", name, email);

    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    console.log("✅ Registration success:", newUser.rows[0].id);
    res.status(201).json({ message: `User registered with ID: ${newUser.rows[0].id}` });

  } catch (error) {
    console.error('🔥 Register error:', error); // show full error
    res.status(500).json({
      message: 'Server error during registration',
      error: error.message, // reveal it to the frontend for now (can hide later)
    });
  }
};
