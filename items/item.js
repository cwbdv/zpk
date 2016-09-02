/**
 * Created by will on 31/08/16.
 */
module.exports = {
    Item: function(name, amt, size, type, gear, bval) {
        var self = {
            name: "",
            type: "",
            amount: 1,
            gear: false,
            rval: 0,
            bval: 0,
            maxval: 0,
            minval: 0,
            size: 0
        };

        if(name != null)
            self.name = name;
        if(amt != null)
            self.amount = amt;
        if(type != null)
            self.type = type;
        if(gear  != null)
            self.gear = gear;
        if(bval != null)
            self.bval = bval;
        if(size != null)
            self.size = size;

        self.rval = self.bval;
        self.maxval = self.bval*1.40;
        self.minval = self.bval*0.60;

        self.addItem = function(amount) {
            self.amt += amount;
        };
        self.remItem = function(amount) {
            self.amt -= amount;
        };

        return self;
    },

    Equippable: function() {
    var self = Item();

    self.gear = true;
    self.equipped = false;

    self.unequip = function() {
        self.equipped = false;
    };
    self.equip = function() {
        self.equipped = true;
    };
},

    Weapon: function() {
    var self = Equippable();

    self.damage = 0;
    //ms
    self.rof = 1000;
},

    Shield: function() {
    var self = Equippable();

    self.bank = 10;
    self.recharge = 0.5;
},

    Engine: function() {
    var self = Equippable();

    self.maxSpeed = 5;
    self.accel = 1;
    self.turning = 1;
}
};