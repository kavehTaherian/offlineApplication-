/**
 * Created by Kaveh T a h e r i a n on 22/07/2017.
 */
module.exports = function()
{
    return {
        schema : {
            created_at : { type: Date , default: Date.now },
            modified_at : { type: Date , default: Date.now }
        },
        virtuals : [
            {
                'name' : 'id',
                'get' : function () {
                    return this._id.toHexString();
                }
            }
        ]
    }
};