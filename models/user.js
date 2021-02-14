const mongoose = require("mongoose");
const crypto = require("crypto-js");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: "Name is required",
		trim: true,
	},
	username: {
		type: String,
		trim: true,
		unique: 'Username already exists',
		required: "Username is required"
	},
	hashed_password: {
		type: String,
		required: "Password is required"
	},
	role: {
		type: String,
		enum: ["admin", "operator"],
		required: "Role is required"
	},
	email: {
		type: String,
		trim: true,
		unique: "Email already exists",
		match: [/.+\@.+\..+/, "Please write a valid email"],
		required: "Email is required"
	},
	salt: String,
	active: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true,
});

userSchema.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

userSchema.path("hashed_password").validate(function (v) {
	if (this._password && this._password.length < 6) {
		this.invalidate("password", "Contraseña debe contener 6 o mas caracteres");
	}
	if (this.isNew && !this._password) {
		this.invalidate("password", "Contraseña es requerida");
	}
}, null);

userSchema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},
	encryptPassword: function (password) {
		if (!password) return "";
		try {
			return crypto.algo.SHA1.create()
				.update(this.salt + password)
				.finalize()
				.toString(crypto.enc.Base64);
		} catch (err) {
			return "";
		}
	},
	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + "";
	}
};

module.exports = mongoose.model("User", userSchema);
