const { verifyToken, verifyRole, hashPassword, comparePasswords, generateToken, generateRefreshToken } = require('../middleware/auth');

// ==========================================
// Authentication Controller
// ==========================================

/**
 * Register New User
 */
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, userType } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Missing required fields',
          details: {
            email: email ? null : 'Email is required',
            password: password ? null : 'Password is required',
            firstName: firstName ? null : 'First name is required',
            lastName: lastName ? null : 'Last name is required'
          }
        }
      });
    }

    // Check if user already exists (mock - replace with DB query)
    // const existingUser = await User.findOne({ where: { email } });
    // if (existingUser) {
    //   return res.status(409).json({
    //     success: false,
    //     error: {
    //       code: 'USER_EXISTS',
    //       message: 'Email already registered'
    //     }
    //   });
    // }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user (mock - replace with DB insert)
    const newUser = {
      id: 'uuid-' + Date.now(),
      email,
      firstName,
      lastName,
      phoneNumber,
      userType: userType || 'customer',
      createdAt: new Date().toISOString()
    };

    // Generate tokens
    const accessToken = generateToken({
      id: newUser.id,
      email: newUser.email,
      userType: newUser.userType
    });

    const refreshToken = generateRefreshToken({
      id: newUser.id,
      email: newUser.email
    });

    res.status(201).json({
      success: true,
      data: newUser,
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'REGISTRATION_ERROR',
        message: error.message
      }
    });
  }
};

/**
 * Login User
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email and password required'
        }
      });
    }

    // Find user (mock - replace with DB query)
    // const user = await User.findOne({ where: { email } });
    // if (!user) {
    //   return res.status(401).json({
    //     success: false,
    //     error: {
    //       code: 'INVALID_CREDENTIALS',
    //       message: 'Invalid email or password'
    //     }
    //   });
    // }

    // Verify password
    // const isValidPassword = await comparePasswords(password, user.passwordHash);
    // if (!isValidPassword) {
    //   return res.status(401).json({
    //     success: false,
    //     error: {
    //       code: 'INVALID_CREDENTIALS',
    //       message: 'Invalid email or password'
    //     }
    //   });
    // }

    // Mock user for demo
    const user = {
      id: 'uuid-123',
      email,
      firstName: 'John',
      lastName: 'Doe',
      userType: 'customer'
    };

    // Generate tokens
    const accessToken = generateToken({
      id: user.id,
      email: user.email,
      userType: user.userType
    }, '24h');

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email
    });

    res.json({
      success: true,
      data: user,
      accessToken,
      refreshToken,
      expiresIn: 86400
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'LOGIN_ERROR',
        message: error.message
      }
    });
  }
};

/**
 * Refresh Token
 */
const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Refresh token required'
        }
      });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      
      const newAccessToken = generateToken({
        id: decoded.id,
        email: decoded.email
      }, '24h');

      res.json({
        success: true,
        accessToken: newAccessToken,
        expiresIn: 86400
      });

    } catch (error) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_REFRESH_TOKEN',
          message: 'Invalid or expired refresh token'
        }
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'TOKEN_ERROR',
        message: error.message
      }
    });
  }
};

/**
 * Logout User
 */
const logout = async (req, res) => {
  try {
    // Add token to blacklist (if using Redis)
    // await redis.setex(`blacklist_${req.user.id}`, 86400, 'true');

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'LOGOUT_ERROR',
        message: error.message
      }
    });
  }
};

/**
 * Forgot Password
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email required'
        }
      });
    }

    // Find user and generate reset token
    // Send email with reset link

    res.json({
      success: true,
      message: 'Password reset link sent to email'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'FORGOT_PASSWORD_ERROR',
        message: error.message
      }
    });
  }
};

/**
 * Reset Password
 */
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Token and new password required'
        }
      });
    }

    // Verify reset token
    // Update user password
    // Invalidate all existing tokens

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'RESET_PASSWORD_ERROR',
        message: error.message
      }
    });
  }
};

module.exports = {
  register,
  login,
  refreshTokenController,
  logout,
  forgotPassword,
  resetPassword
};
