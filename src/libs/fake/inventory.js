import uuid from 'uuid/v4'

module.exports = () => {
  const inventory = []

  // image = 'https://files.opskins.media/file/vgo-img/item/wax-key-300.png'
  // image = 'https://files.opskins.media/file/vgo-img/item/awp-golden-illusion-factory-new-300.png'

  for (var i = 0; i < 100; i++) {
    inventory.push({
      id: uuid(),
      color: '#de3ee6',
      price: 25.99,
      name: 'Afterglow Wired Controller for Xbox One',
      image:
        'https://static.wax.io/d-img/dynamic-apps/img/phpqkombg-ca194a2788.png',
    })
  }

  return inventory
}
