router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  console.log('REGISTER REQUEST BODY:', req.body); // Debug log

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hash });

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.status(201).json({ token, name: newUser.name });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Registration error' });
  }
});
