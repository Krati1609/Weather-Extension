# 🌤️ Retro Weather Extension

A browser extension with a nostalgic Windows 95 aesthetic featuring pastel colors, neon accents, and real-time weather updates.

![License](https://img.shields.io/badge/license-MIT-blue) ![JavaScript](https://img.shields.io/badge/javascript-vanilla-yellow)

✨ Features

- 🌍 **Current Weather** - Real-time temperature, humidity, wind speed, and feels-like
- 📅 **3-Day Forecast** - See what's coming with cute weather emojis  
- 📍 **Geolocation Support** - Auto-detect your location or search any city
- 🎨 **Retro Aesthetic** - Windows 95-inspired UI with pixel fonts and puffy borders
- 🌈 **Dynamic Animations** - Backgrounds change based on weather conditions

🚀 Setup

1. Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
2. Open `popup.js` and replace `YOUR_API_KEY_HERE` on line 2 with your key
3. Load the extension:
   - **Chrome/Edge:** `chrome://extensions/` → Enable Developer mode → Load unpacked
   - **Firefox:** `about:debugging` → Load Temporary Add-on → Select `manifest.json`

That's it! Click the extension icon to start using it.

🛠️ Built With

- Vanilla JavaScript (no frameworks!)
- [WeatherAPI](https://www.weatherapi.com/) for weather data
- CSS Grid & Flexbox for layout
- Google Fonts (Press Start 2P & VT323)

🎨 Customization

Want to make it your own?

- **Change default city:** Line 40 in `popup.js`
- **Adjust colors:** Lines 11, 30-32, 91-93 in `popup.css`
- **Add more weather data:** Check the [WeatherAPI docs](https://www.weatherapi.com/docs/) for available fields

📁 Project Structure
```
retro-weather-extension/
├── manifest.json       # Extension configuration
├── popup.html          # UI structure
├── popup.css           # Retro styling & animations
├── popup.js            # API calls & logic
└── icons/              # Extension icons (16px, 48px, 128px)
```

💡 What I Learned

This project helped me understand:
- Browser extension architecture (Manifest V3)
- REST API integration with `fetch()` and `async/await`
- Error handling for API calls
- CSS animations and transitions
- Responsive design with CSS Grid

🐛 Troubleshooting

|          Issue         |                          Solution                           |
|------------------------|-------------------------------------------------------------|
| Extension won't load   | Enable Developer Mode in browser settings                   |
| "City not found" error | Check spelling, try a larger city                           |
| API not working        | Verify your API key is correct in `popup.js`                |
| Icons not showing      | Ensure `icons/` folder has all 3 PNG files with exact names |

📜 License

MIT License - feel free to use and modify!

🙏 Acknowledgments

- Weather data from [WeatherAPI.com](https://www.weatherapi.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Inspired by retro computing aesthetics

---

⭐ **Star this repo if you like retro vibes and weather apps!**

📬 **Questions?** Open an issue or reach out!
