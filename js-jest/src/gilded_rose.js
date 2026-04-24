class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const specialItem = new Set([
  'Aged Brie',
  'Backstage passes to a TAFKAL80ETC concert', 
  'Sulfuras, Hand of Ragnaros'
])

function isASpecialItem(item) {
  return specialItem.has(item)
}

function isAgedBrie(item) {
  return (item === "Aged Brie")
}

function isBackstagePass(item) {
  return (item === "Backstage passes to a TAFKAL80ETC concert")
}

function isSulfuras(item) {
  return (item === "Sulfuras, Hand of Ragnaros")
}

function hasQualityAboveZero(item) {
  return (item > 0)
}

function hasQualityBelowZero(quality) {
  return (quality < 0)
}

function hasQualityAbove50(item) {
  return (item > 50)
}

function hasQualityBelow50(item) {
  return (item < 50)
}

function dropsQualityBy1(item) {
  if (item > 0) {
    item -= 1
  }
  return item
}

function addsQualityBy1(item) {
  if (item < 50) {
    item += 1
  }
  return item
}

function hasSellInBelow10Days(sellIn) {
  return (sellIn < 11)
}

function hasSellInBelow5Days(sellIn) {
  return (sellIn < 6)
}

function hasSellInBelow0Days(sellIn) {
  return (sellIn < 0)
}

function dropsSellInBy1(sellIn) {
  return sellIn -= 1
}


class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let name = this.items[i].name
      let sellIn = this.items[i].sellIn
      let quality = this.items[i].quality

      if (!isASpecialItem(name)) {
        if (hasQualityAboveZero(quality)) {
          quality = dropsQualityBy1(quality) 
        }
      } else {
        if (hasQualityBelow50) {
          quality = addsQualityBy1(quality)
          if (isBackstagePass(name)) {
            if (hasSellInBelow10Days(sellIn)) {
              quality = addsQualityBy1(quality)
            }
            if (hasSellInBelow5Days(sellIn)) {
              quality = addsQualityBy1(quality)
            }
          }
        }
      }
      if (!isSulfuras(name)) {
        sellIn = dropsSellInBy1(sellIn)
      }
      if (hasSellInBelow0Days(sellIn)) {
        if (!isAgedBrie(name)) {
          if (!isBackstagePass(name)) {
            if (hasQualityAboveZero(quality)) {
              if (!isSulfuras(name)) {
                quality = dropsQualityBy1(quality);
              }
            }
          } else {
            quality = 0;
          }
        } else {
          if (hasQualityBelow50(quality)) {
            quality = addsQualityBy1(quality)
          }
        }
      }
      this.items[i].name = name
      this.items[i].sellIn = sellIn
      this.items[i].quality = quality
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
