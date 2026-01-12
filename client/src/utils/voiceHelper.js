// Helper functions for Japanese Text-to-Speech

/**
 * Lấy giọng đọc tiếng Nhật tốt nhất từ trình duyệt
 * @returns {SpeechSynthesisVoice|null}
 */
export const getBestJapaneseVoice = () => {
  const voices = window.speechSynthesis.getVoices()
  const japaneseVoices = voices.filter(voice => 
    voice.lang === 'ja-JP' || voice.lang.startsWith('ja')
  )
  
  // Ưu tiên giọng nữ Nhật Bản (thường tự nhiên hơn)
  const preferredVoice = japaneseVoices.find(voice => 
    voice.name.includes('Female') || 
    voice.name.includes('女性') ||
    voice.name.includes('Kyoko') ||
    voice.name.includes('Otoya') ||
    voice.name.includes('Google 日本語') ||
    voice.name.includes('Google Japanese')
  ) || japaneseVoices[0]
  
  return preferredVoice || null
}

/**
 * Lấy tất cả giọng đọc tiếng Nhật có sẵn
 * @returns {SpeechSynthesisVoice[]}
 */
export const getAllJapaneseVoices = () => {
  const voices = window.speechSynthesis.getVoices()
  return voices.filter(voice => 
    voice.lang === 'ja-JP' || voice.lang.startsWith('ja')
  )
}

/**
 * Phát âm văn bản tiếng Nhật
 * @param {string} text - Văn bản cần đọc
 * @param {SpeechSynthesisVoice|null} voice - Giọng đọc (tùy chọn)
 * @param {number} rate - Tốc độ đọc (0.1-10, mặc định 0.75)
 * @param {number} pitch - Cao độ giọng (0-2, mặc định 1.0)
 */
export const speakJapanese = (text, voice = null, rate = 0.75, pitch = 1.0) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Trình duyệt không hỗ trợ Text-to-Speech')
    return
  }

  window.speechSynthesis.cancel()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ja-JP'
  utterance.rate = rate
  utterance.pitch = pitch
  utterance.volume = 1.0
  
  if (voice) {
    utterance.voice = voice
  } else {
    const bestVoice = getBestJapaneseVoice()
    if (bestVoice) {
      utterance.voice = bestVoice
    }
  }
  
  window.speechSynthesis.speak(utterance)
}

/**
 * Debug: In ra console tất cả giọng đọc có sẵn
 */
export const debugVoices = () => {
  const voices = window.speechSynthesis.getVoices()
  console.log('=== Tất cả giọng đọc có sẵn ===')
  voices.forEach((voice, index) => {
    console.log(`${index + 1}. ${voice.name} (${voice.lang})`, {
      localService: voice.localService,
      default: voice.default
    })
  })
  
  console.log('\n=== Giọng đọc tiếng Nhật ===')
  const japaneseVoices = getAllJapaneseVoices()
  japaneseVoices.forEach((voice, index) => {
    console.log(`${index + 1}. ${voice.name} (${voice.lang})`)
  })
  
  const bestVoice = getBestJapaneseVoice()
  console.log('\n=== Giọng được chọn ===')
  console.log(bestVoice ? `${bestVoice.name} (${bestVoice.lang})` : 'Không tìm thấy giọng tiếng Nhật')
}

/**
 * Đợi giọng đọc được load (một số trình duyệt cần thời gian)
 * @returns {Promise<void>}
 */
export const waitForVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve()
      return
    }
    
    window.speechSynthesis.onvoiceschanged = () => {
      resolve()
    }
    
    // Timeout sau 3 giây
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}
