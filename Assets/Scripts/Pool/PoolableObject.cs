using DG.Tweening;
using UnityEngine;

public class PoolableObject : MonoBehaviour
{
    public void ReturnToPool()

    {
        gameObject.transform.DOKill();
        gameObject.transform.localScale = Vector3.one;
        gameObject.SetActive(false);
    }
}