using UnityEngine;
using System.Collections.Generic;
using UnityEngine.UI;

[CreateAssetMenu(fileName = "ItemTable", menuName = "Item Table")]
public class ItemTable : ScriptableObject
{
    [System.Serializable]
    public class ItemInfo   
    {
        public string itemName;
        public Sprite itemImage;
    }

    public List<ItemInfo> lstItemInfo = new List<ItemInfo>();
    public Sprite GetItemSpriteByName(string itemName)
    {
        for (int i = 0; i < lstItemInfo.Count; i++)
        {
            if (lstItemInfo[i].itemName == itemName)
            {
                return lstItemInfo[i].itemImage;
            }
        }
        Debug.LogError("Not found any item match the name !!!");
        return null;
    }
}
