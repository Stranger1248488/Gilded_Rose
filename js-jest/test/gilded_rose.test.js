const { Item, Shop } = require("../src/gilded_rose.js");
// You need more tests than just the ones written here, this is just to get you started.
// USE COVERAGE GUTTERS TO GUIDE YOUR TEST WRITING

// 	- All items have a SellIn value which denotes the number of days we have to sell the item
// 	- All items have a Quality value which denotes how valuable the item is
// 	- At the end of each day our system lowers both values for every item ------2/2 --DONE

// 	- Once the sell by date has passed, Quality degrades twice as fast --DONE
// 	- The Quality of an item is never negative ---DONE
// 	- The Quality of an item is never more than 50 ----DONE
// 	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality ---DONE
// 	- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// 	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// 	Quality drops to 0 after the concert ---------3/3 --- DONE

function generateNormalItem(daysFromSellIn, value){
  let normalItem = new Item("normal", daysFromSellIn, value); //build
  const gildedRose = new Shop([normalItem]);
  return gildedRose 
}




describe("Gilded Rose Pin Down Tests", () => {
  test("Normal items should degrade in quality by 1 each day", () => {
    let gildedRose = generateNormalItem(10, 20)

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(19); //check
  });
  
  test("Normal items should denote the number of days left to sell the item",() => {
    let gildedRose = generateNormalItem(10, 20)

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].sellIn).toBe(9); //check
  })

  test("once sell by date passes, quality should degrade twice as fast", () => {
    let gildedRose = generateNormalItem(0, 20)

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(18); 
  })

  test("Normal items should never have quality fall below 0",() => {
    let gildedRose = generateNormalItem(0, 1)

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0); 
  })

  test("if a normalItem pass is 2 days passed, quality should drop by 2", () => {
    let normalItem = new Item("normal", -1, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(18); //check
  })

  test("normalItem drops by 1 when 3 days past", () => {
    let normalItem = new Item("Nore Mal", -3, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(18); //check
  })

  test('sees if normalItem has negative quality', () => {
    let normalItem = new Item("Nore Mal", 5, 0); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(0); //check
  })

  test("agedBrie should never grow beyond 50 in quality", () => {
    let agedBrie = new Item("Aged Brie", 20, 50);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50); 
  })

  test("backstage concerts should never grow beyond 50 in quality", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50); 
  })

  test("backstagePass increase by 1 before 10 days", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 20, 5);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(6); 
  })

  test("backstagePass increase by 2 while in 10 day range", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 12);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(14); 
  })

  test("backstagePass increase by 3 while in 5 day range", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(23); 
  })

  test("backstagePass quality drops to 0 after concert passes", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0); 
  })

  test("sulfuras value stays the same", () => {
    let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 1, 80);
    const gildedRose = new Shop([sulfuras]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80); 
  });

  test("sulfuras never needs to be sold", () => {
    let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 5, 80);
    const gildedRose = new Shop([sulfuras]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(5);
  });

  test("sulfuras never needs to be sold", () => {
    let sulfuras = new Item("Sulfuras, Hand of Ragnaros", -5, 80);
    const gildedRose = new Shop([sulfuras]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
  });

  test('Quality of "Aged Brie" should increase by 1 each day', () => {
    let agedBrie = new Item("Aged Brie", 11, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
  });

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      20
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(23);
  });



  test("agedBrie has to increase by 1", () => {
    let agedBrie = new Item("Aged Brie", -5, 20); //build
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(22); //check
  })

  test("agedBrie has to increase by 2 when past sellIn date and 50 quality", () => {
    let agedBrie = new Item("Aged Brie", -5, 52); //build
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(52); //check
  })

  
  test("backstaegPass goes up from 49 and stops at 50", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49); //build
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(50); //check
  })

  
});
